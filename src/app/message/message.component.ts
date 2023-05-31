import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GuildService } from '../guild.service';
import { MessageService } from '../message.service';
import { RoachMessage } from '../models/discord-message';
import { RoachGuild } from '../models/roach-guild';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  constructor(private route: ActivatedRoute, private guildService: GuildService, private messageService: MessageService, private router: Router) {}

  discordId: string | null = null;
  discord: Observable<RoachGuild> | undefined;
  messages: Observable<RoachMessage[]> | undefined;
  showCreateSubject: boolean = false;
  subject: string = "";

  errors: string[] = [];
  success: string = "";
  MINIMUM_SUBJECT_LENGTH: number = 5;

  ngOnInit(): void {
    // Load in discordId
    this.route.params.subscribe(param => {
      this.discordId = param['discordId'];

      if (this.discordId) {
        this.discord = this.guildService.getDiscordByRawId(this.discordId);
        this.messages = this.messageService.getMessagesByRawGuildId(this.discordId);
      } else {
        // Redirect back to previous page.
        this.router.navigate(['discords']);
      }
    });

  }

  toggleCreateSubject() {
    this.showCreateSubject = !this.showCreateSubject;
    this.errors = [];
  }

  delete(message: RoachMessage) {
    // Delete message
    this.messageService.deleteMessage(message.id).subscribe(response => {
      if (response) {
        this.success = `Successfully removed ${message.subject}!`;
        // Update messages
        this.messages = this.messageService.getMessagesByRawGuildId(this.discordId!);
      } else {
        this.errors.push(`Unable to remove ${message.subject}. Please contact Roach support.`);
      }
    });
  }

  view(message: RoachMessage) {
    // Navigate to the /reactions/:messageId
    this.router.navigate(['reactions', message.id]);
  }

  create() {
    
    if (this.subject.length < this.MINIMUM_SUBJECT_LENGTH) {
      const exists = this.errors.includes(`You must enter in at least ${this.MINIMUM_SUBJECT_LENGTH} characters in your subject.`);
      
      if (!exists)
        this.errors.push(`You must enter in at least ${this.MINIMUM_SUBJECT_LENGTH} characters in your subject.`);
      return;
    }

    if (!this.discordId) {
      const exists = this.errors.includes(`An error has occurred. Please click 'Role Reactions' and try again.`);

      if (!exists)
        this.errors.push(`An error has occurred. Please click 'Role Reactions' and try again.`);
      return;
    }

    // Determine if the subject already exists.
    if (this.messages) {
      this.messages.subscribe(message => {
        const exists = message.filter(m => m.subject.toUpperCase() === this.subject.toUpperCase()).length > 0;
        if (exists) {
          const errorExists = this.errors.includes("The subject you entered already exists.");
          if (!errorExists)
            this.errors.push("The subject you entered already exists.");
        } else {
          // Doesn't exist, so add it.
          this.messageService.createMessage(this.discordId!, this.subject).subscribe(createdMessage => {
            if (createdMessage) {
              // Update the messages
              this.messages = this.messageService.getMessagesByRawGuildId(this.discordId!);
              // Hide the form and errors.
              this.showCreateSubject = false;
              this.errors = [];
            }
          });
        }
      });
    } else {
      // Messages don't exist, so just add it.
      this.messageService.createMessage(this.discordId!, this.subject).subscribe(createdMessage => {
        if (createdMessage) {
          // Update messages
          this.messages = this.messageService.getMessagesByRawGuildId(this.discordId!);
          // Hide the form and errors.
          this.showCreateSubject = false;
          this.errors = [];
        }
      });
    }
  }
}
