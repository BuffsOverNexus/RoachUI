import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private userService: UserService) {}

  ngOnInit(): any {
      // Determine if a state value has been stored
      const state = localStorage.getItem("state");
      console.log("Saved State: ", state);
      if (!state) {
        this.authService.generateState();
        // Redirect back to login screen
        this.router.navigateByUrl("login");
        
      } else {
        if (!state) throw new Error("No state value found.");
        this.route.queryParams.subscribe(param => {
          if (param['code'] && param['state']) {
            const receivedState = param['state'];
            const code = param['code'];

            console.log("Received State: ", receivedState);

            // Validate that the state values match, otherwise they are trying to inject :(
            if (receivedState !== state) throw new Error("State value does not match. Good try though!");

            const discordResponse = this.authService.exchangeCode(code); 

            discordResponse.subscribe(response => {
              // Now acquire user information, save to storage, then move on.
              const userDiscordResponse = this.authService.getUserDetails(response.access_token, response.token_type);

              userDiscordResponse.subscribe(userResponse => {
                // Determine if the user is in our database.
                try {
                  this.userService.getUserByRawId(userResponse.id).subscribe(userDetailsResponse => {
                      if (userDetailsResponse) {
                        // Update last logged in
                        this.userService.updateLastLogin(userResponse.id).subscribe(updatedUser => {
                          // Once the response is given back, login the user
                          this.authService.login(userDetailsResponse.rawId, userDetailsResponse.name, userResponse.avatar, userDetailsResponse.admin);
                          this.router.navigate(['discords']);
                        });
                      } else {
                        this.userService.createUser(userResponse.id, userResponse.username).subscribe(createUserDetailsResponse => {
                          this.authService.login(createUserDetailsResponse.rawId, createUserDetailsResponse.name, userResponse.avatar, createUserDetailsResponse.admin);
                          this.router.navigate(['discords']);
                        });
                      }
                    });
                } catch (e: any) {
                  console.error("How did this happen....");
                }

              });
            });

          }
        });
      }
  }

}
