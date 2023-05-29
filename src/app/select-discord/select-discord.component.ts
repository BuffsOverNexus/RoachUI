import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DiscordGuild } from '../models/discord_guild';
import { DiscordService } from '../discord.service';
import { Observable } from 'rxjs';
import { GuildService } from '../guild.service';
import { RoachGuild } from '../models/roach-guild';
import { DiscordChannel } from '../models/discord-channel';

@Component({
  selector: 'app-select-discord',
  templateUrl: './select-discord.component.html',
  styleUrls: ['./select-discord.component.css']
})
export class SelectDiscordComponent {
  
  constructor(private authService: AuthService, private router: Router, private discordService: DiscordService, private guildService: GuildService) {}

  public discordGuilds: Observable<DiscordGuild[]> | undefined;
  public discordChannels: Observable<DiscordChannel[]> | undefined;

  isLoggedIn: boolean = this.authService.isLoggedIn();

  selectedDiscord: DiscordGuild | undefined;
  selectedDiscordId: string | undefined;
  selectedChannelId: string | undefined;
  errors: string[] = [];
  
  ngOnInit(): void {
    if (this.isLoggedIn) {
      const userId: string = this.authService.getUserId();
      this.discordGuilds = this.discordService.getDiscordsByUser(userId);
      
    } else {
      // Redirect
      this.authService.redirect();
    }
  }

  continue() {
    if (!this.selectedDiscordId) {
      this.errors.push("You must select a valid Discord before you can continue.");
      return;
    }

    if (!this.discordGuilds) {
      this.errors.push("An error has occurred. Roach is unable to determine if your Discord already exists in our system. Please contact support.");
      return;
    }

    // Retrieve the discord guild selected.
    this.discordGuilds?.subscribe(discordGuilds => {
      console.log(discordGuilds);
      discordGuilds.filter(discordGuild => discordGuild.id === this.selectedDiscordId).forEach(discordGuild => {
        this.selectedDiscord = discordGuild;
      });

      // Determine if the guild needs to be registered first.
      if (this.selectedDiscord) {
        if (this.selectedDiscord.exists) {
          // Redirect to the proper page. Otherwise, the page will dynamically tell the user to select a text channel.
          this.router.navigate(['discord', this.selectedDiscordId]);
        } else {
          // Grab the latest channels
          this.discordChannels = this.discordService.getChannelsInDiscord(this.selectedDiscord.id);
        }
      } else {
        this.errors.push("An error has occurred. Roach is unable to determine if your Discord already exists in our system. Please contact support.");
      }
    });
  }

  register() {

    if (!this.discordChannels) {
      this.errors.push("An error has occurred. Roach is unable to grab all of the channels from your guild.");
      return;
    }

    if (!this.selectedChannelId) {
      this.errors.push("You must select a channel before continuing.");
      return;
    }

    if (this.selectedDiscord) {
      this.discordChannels.subscribe(discordChannels => {
        console.log("Got here");
        discordChannels.filter(discordChannel => discordChannel.id == this.selectedChannelId).forEach(channel => {
          // Add the Discord to the API.
          const userId = this.authService.getUserId();
          const discordId = this.selectedDiscord?.id;
          const result = this.guildService.createDiscord(userId, discordId!, this.selectedDiscord!.name, channel.name, channel.id);

          // Wait until the server responds before moving on...
          result.subscribe(r => {
            this.router.navigate(['discord', this.selectedDiscordId]);
          });
        });
      })
    }

  }
}
