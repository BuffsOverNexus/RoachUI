import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';
import { UserAnnouncement } from '../models/user-announcement';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-announcement',
  templateUrl: './admin-announcement.component.html',
  styleUrls: ['./admin-announcement.component.css']
})
export class AdminAnnouncementComponent implements OnInit {

  constructor(private authService: AuthService, private announcementService: AnnouncementService, private datePipe: DatePipe, private userService: UserService) {}
 
  errors: string[] = [];

  announcements: UserAnnouncement[] = [];
  savedAnnouncements: Observable<Announcement[]> | undefined;
  
  showCreateAnnouncement: boolean = false;

  createdAnnouncement: CreatedAnnouncement = { title: "", content: "" };
  MINIMUM_TITLE_LENGTH: number = 5;
  MINIMUM_CONTENT_LENGTH: number = 15;

  ngOnInit(): void {
    this.updateAnnouncementData();
  }

  updateAnnouncementData() {
    this.savedAnnouncements = this.announcementService.getAllAnnouncements();
      this.savedAnnouncements.subscribe(announcements => {
        this.announcements = [];
        announcements.reverse().forEach((announcement) => {
          this.userService.getUserById(String(announcement.userId)).subscribe(user => {
            const userAnnouncement: UserAnnouncement = {
              posted: this.convertToReadableDate(announcement.posted)!,
              id: announcement.id,
              title: announcement.title,
              content: announcement.content,
              userId: announcement.userId,
              user
            };
            this.announcements.push(userAnnouncement);
          });
        });
      });
  }

  convertToReadableDate(date: string) {
    const convertedDate = new Date(date);
    return this.datePipe.transform(convertedDate, "MM-dd-YYYY hh:mm a");
  }

  toggleCreateAnnouncement() {
    this.showCreateAnnouncement = !this.showCreateAnnouncement;
  }

  create() {
    this.errors = [];

    // Ensure length of content and title
    if (this.createdAnnouncement.content.length <= this.MINIMUM_CONTENT_LENGTH) {
      this.errors.push(`You must enter in at least ${ this.MINIMUM_CONTENT_LENGTH } characters for the content.`);
      return;
    }

    if (this.createdAnnouncement.title.length <= this.MINIMUM_TITLE_LENGTH) {
      this.errors.push(`You must enter in at least ${ this.MINIMUM_TITLE_LENGTH } characters for the title`);
      return;
    }

    // Retrieve the user's roach ID
    this.userService.getUserByRawId(this.authService.getUserId()).subscribe(user => {
      // Create the announcement
      this.announcementService.createAnnouncement(user.id, this.createdAnnouncement.title, this.createdAnnouncement.content).subscribe(createdAnnouncement => {
        this.updateAnnouncementData();
      });

    });

  }

  delete(userAnnouncement: UserAnnouncement) {
    this.announcementService.deleteAnnouncement(userAnnouncement.id).subscribe(deletedAnnouncement => {
      this.updateAnnouncementData();
    })
  }

}

interface CreatedAnnouncement {
  title: string,
  content: string
}
