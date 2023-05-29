import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

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
      const state = localStorage.getItem("state");

      if (!state) {
        const updatedState = this.authService.generateState();
        this.state = updatedState;
      } else {
        this.state = state;
      }

      this.url = "https://discord.com/api/oauth2/authorize?client_id=1105618210545475597&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fauth&response_type=code&scope=identify%20email&state=" + state;
  }
}
