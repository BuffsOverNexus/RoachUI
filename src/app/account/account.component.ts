import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { RoachUser } from '../models/roach-user';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService, private datePipe: DatePipe, private router: Router) {}

  isLoggedIn: boolean = this.authService.isLoggedIn();

  userId: string = this.authService.getUserId();
  name: string = this.authService.getUserName();
  avatar: string = this.authService.getAvatarUrl();

  user: Observable<RoachUser> | undefined;

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['login']);
      return;
    }
    
    this.user = this.userService.getUserByRawId(this.userId);
  }

  convertToReadableDate(date: string) {
    const convertedDate = new Date(date);
    //return convertedDate;
    return this.datePipe.transform(convertedDate, "MM-dd-YYYY hh:mm a");
  }

}
