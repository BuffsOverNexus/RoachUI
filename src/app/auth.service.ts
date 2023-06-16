import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscordAccessTokenResponse } from './models/discord-access-token-response';
import { getAuthPath } from './boturls';
import { DiscordUser } from './models/discord-user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  private CLIENT_SECRET: string = "Yo4NGark_jPgeq3roOUXK039iB8SKngk";
  private CLIENT_ID: string = "1105618210545475597";
  private DISCORD_AUTHORIZATION_URL: string = "https://discord.com/api/oauth2/token";
  private DISCORD_USER_URL: string = "https://discord.com/api/users/@me";

  generateState() {
    const state = crypto.randomUUID();
    localStorage.setItem("state", state);
    return state;
  }

  exchangeCode(code: string): Observable<DiscordAccessTokenResponse> {
    // Determine if state variable is saved.
    const state = localStorage.getItem("state");

    if (!state) throw new Error("No state value found.");

    // Remove the state
    localStorage.removeItem("state");
    
    const data = new HttpParams()
    .set("client_id", this.CLIENT_ID)
    .set("client_secret", this.CLIENT_SECRET)
    .set("grant_type", "authorization_code")
    .set("code", code)
    .set("redirect_uri", getAuthPath())
    .set("scope", "identify email");

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.httpClient.post<DiscordAccessTokenResponse>(this.DISCORD_AUTHORIZATION_URL, data.toString(), { headers });
  }

  getUserDetails(accessToken: string, tokenType: string): Observable<DiscordUser> {

    const headers = {
      Authorization: `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json',
    }
    return this.httpClient.get<DiscordUser>(this.DISCORD_USER_URL, { headers: headers });
  }

  isLoggedIn(): boolean {
    const userId = sessionStorage.getItem("userId");
    const name = sessionStorage.getItem("name");

    if ( !(userId || name) ) {
      return false;
    }
    return true;
  }

  redirect() {
    // Redirect user to login page
    this.router.navigate(['login']);
  }

  getUserId() {
    const userId = sessionStorage.getItem("userId");
    if (userId)
      return userId;
    else
      return "";
  }

  getUserName() {
    const name = sessionStorage.getItem("name");
    if (name)
      return name;
    else
      return "";
  }

  getAvatar() {
    const avatar = sessionStorage.getItem("avatar");
    if (avatar)
      return avatar;
    else
      return "";
  }

  getAvatarUrl() {
    const url = "https://cdn.discordapp.com/avatars/" + this.getUserId() + "/" + this.getAvatar();
    if (url) {
      return url;
    } else {
      return "";
    }
  }

  getAdmin() {
    const admin = Boolean(sessionStorage.getItem("admin"));
    return admin;
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
  }

  login(userId: string, name: string, avatar: string, admin: boolean) {
    localStorage.removeItem("state");
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("avatar", avatar);
    sessionStorage.setItem("admin", admin.toString());
  }
}
