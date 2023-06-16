import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement';
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';
import { RoachUser } from '../models/roach-user';
import {marked } from 'marked';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private announcementService: AnnouncementService, private userService: UserService, private datePipe: DatePipe) {}
  
  loadedAnnouncements: Observable<Announcement[]> | undefined;
  announcements: UserAnnouncement[] = [];
  
  ngOnInit(): void {
    this.loadedAnnouncements = this.announcementService.getAllAnnouncements();  

    this.loadedAnnouncements.subscribe(announcements => {
      announcements.reverse().forEach(announcement => {
        const userData = this.getUserData(announcement.userId);
        userData.subscribe(user => {
          this.announcements.push({
            id: announcement.id,
            title: announcement.title,
            userId: announcement.userId,
            content: this.convertToHtml(announcement.content),
            posted: announcement.posted,
            user: user
          });
        });
      });
    })
  }

  getUserData(userId: number): Observable<RoachUser> {
    return this.userService.getUserById(userId.toString());
  }

  convertToReadableDate(date: string) {
    const convertedDate = new Date(date);
    //return convertedDate;
    return this.datePipe.transform(convertedDate, "MM-dd-YYYY hh:mm a");
  }

  convertToHtml(text: string): string {
    return marked(text, {mangle: false}).replace("\\n", "<br />");
  }
}

interface UserAnnouncement extends Announcement {
  user: RoachUser
}
