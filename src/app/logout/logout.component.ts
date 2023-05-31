import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
      // Log the person out
      if (localStorage.getItem("userId")) {
        // Auth service handles logging out
        this.authService.logout();
      }

      this.router.navigateByUrl("login");
  }
}
