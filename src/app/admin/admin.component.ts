import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {}


  viewAnnouncements = true;
  viewUsers = false;
  viewDiscords = false;


  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    if (!this.authService.getAdmin()) {
      this.router.navigate(['account']);
    }
  }

  viewAnnouncementsMenu() {
    this.disableAllMenus();
    this.viewAnnouncements = true;
  }

  viewUsersMenu() {
    this.disableAllMenus();
    this.viewUsers = true;
  }

  viewDiscordsMenu() {
    this.disableAllMenus();
    this.viewDiscords = true;
  }

  disableAllMenus() {
    this.viewAnnouncements = this.viewUsers = this.viewDiscords = false;
  }

}
