import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LogoutComponent } from './logout/logout.component';
import { SelectDiscordComponent } from './select-discord/select-discord.component';
import { AccountComponent } from './account/account.component';
import { DatePipe } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { SetupComponent } from './setup/setup.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    NavigationComponent,
    LogoutComponent,
    SelectDiscordComponent,
    AccountComponent,
    PageNotFoundComponent,
    LoadingComponent,
    SetupComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'auth', component: AuthComponent},
      {path: 'logout', component: LogoutComponent},
      {path: 'discords', component: SelectDiscordComponent},
      {path: 'account', component: AccountComponent},
      {path: 'setup', component: SetupComponent},
      {path: 'message/:discordId', component: MessageComponent},
      {path: '**', component: PageNotFoundComponent},
      
    ]),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
