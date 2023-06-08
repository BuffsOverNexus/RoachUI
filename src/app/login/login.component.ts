import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { getAuthUrl } from '../boturls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService) {}

  state: string = "";
  url: string | undefined;

  ngOnInit(): void {
      // Determine if state exists
      const state = sessionStorage.getItem("state");

      if (!state) {
        const updatedState = this.authService.generateState();
        this.state = updatedState;
        this.url = getAuthUrl() + this.state;
        console.log(this.state);
      } else {
        this.state = state;
        console.log(this.state);
        this.url = getAuthUrl() + this.state;
      }

  }
}
