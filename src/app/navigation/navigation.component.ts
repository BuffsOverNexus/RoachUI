import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private authService: AuthService) {}

  
  name: string = this.authService.getUserName();
  userId: string = this.authService.getUserId();
  avatar: string = this.authService.getAvatarUrl();
  admin: boolean = this.authService.getAdmin();

  isLoggedIn: boolean = this.authService.isLoggedIn();

}

