import { Component, OnInit } from '@angular/core';
import { ReactionService } from '../reaction.service';
import { MessageService } from '../message.service';
import { RoachMessage } from '../models/discord-message';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { RoachReaction } from '../models/roach-reaction';
import { GuildService } from '../guild.service';
import { RoachGuild } from '../models/roach-guild';
import { DiscordRole } from '../models/discord-role';
import { DiscordEmote } from '../models/discord-emote';
import { DiscordService } from '../discord.service';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css']
})
export class ReactionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private reactionService: ReactionService, private messageService: MessageService, private authService: AuthService, private guildService: GuildService, private discordService: DiscordService) {}

  errors: string[] = [];

  message: Observable<RoachMessage> | undefined;
  messageId: string | undefined;

  reactions: Observable<RoachReaction[]> | undefined;
  guild: Observable<RoachGuild> | undefined;

  roles: Observable<DiscordRole[]> | undefined;
  emotes: Observable<DiscordEmote[]> | undefined;
  emoteList: DiscordEmote[] = [];

  selectedEmote: DiscordEmote | undefined;

  showChooseEmote: boolean = false;

  selectedRole: string = "-1";

  success: string = "";


  ngOnInit(): void {
    // Redirect if not logged in 
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    // Gather all necessary information
    this.route.params.subscribe(param => {
      this.messageId = param['messageId'];

      if (this.messageId) {
        this.message = this.messageService.getMessageById(this.messageId);
        this.reactions = this.reactionService.getReactionsByMessage(this.messageId);


        this.message.subscribe(message => {
          this.guild = this.guildService.getGuildById(message.guildId);
          this.guild.subscribe(guild => {
            this.roles = this.discordService.getRolesInDiscord(guild.rawId);
            this.emotes = this.discordService.getEmotesInDiscord(guild.rawId);

            this.emotes.subscribe(emotes => {
              this.emoteList = emotes;
            });
          });
        });

      } else {
        this.router.navigate(['discords']);
      }
      
    });
  }


  selectEmote(emote: DiscordEmote) {
    console.log(emote);
    this.selectedEmote = emote;
  }

  toggleEmoteMenu() {
    this.showChooseEmote = !this.showChooseEmote;
  }

  getEmoteUrl(emoteId: string) {
    for (let emote of this.emoteList) {
      if (emote.id == emoteId) {
        return emote.image;
      }
    }
    return "";
  }

  save() {
    this.errors = [];
    this.success = "";
    if (this.selectedEmote) {
      if (this.selectedRole.length > 0) {
        this.guild?.subscribe(guild => {
          this.roles?.subscribe(roles => {
            roles.forEach(role => {
              if (role.id == this.selectedRole) {
                this.reactionService.createReactionById(this.messageId!, guild.rawId, this.selectedEmote!.id, this.selectedRole, role.name).subscribe(response => {
                  this.toggleEmoteMenu();
                  this.selectedEmote = undefined;
                  this.selectedRole = "-1";
                  // Update reactions
                  this.reactions = this.reactionService.getReactionsByMessage(this.messageId!);
                  this.success = "Successfully created role reaction!";
                });
              }
            })
          });
        });
        
      }
    } else {
      this.errors.push("You must select one emote. Click 'Select Emote' and choose an emoji.");
    }
  }

  publish() {
    this.success = "";
    this.errors = [];
    // Determine if there are any role reactions
    if (this.reactions) {
      console.log("Got here");
      this.reactions.subscribe(reactions => {
        if (reactions.length > 0) {
          // Publish
          this.messageService.regenerateMessage(this.messageId!).subscribe(response => {
            if (response) {
              console.log(response);
              this.success = "Your message was successfully published to Discord!";
            }
          });
        } else {
          this.errors.push("You must have at least one (1) role reaction before you can publish!");
        }
      });
    } else {
      this.errors.push("An error has occurred. Please contact the Roach team.");
    }
  }

  delete(reaction: RoachReaction) {
    // Delete the reaction
    this.reactionService.deleteReaction(reaction.id).subscribe(response => {
      // Now grab the latest data
      this.reactions = this.reactionService.getReactionsByMessage(this.messageId!);
    });
  }
}
