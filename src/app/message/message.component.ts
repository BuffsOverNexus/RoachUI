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

  ngOnInit(): void {
    // Load in discordId
    this.route.params.subscribe(param => {
      this.discordId = param['discordId'];

      if (this.discordId) {
        this.discord = this.guildService.getDiscordByRawId(this.discordId);
        this.messages = this.messageService.getMessagesByRawGuildId(this.discordId);

        this.discord.subscribe(discord => {
          console.log(discord);
        });

        this.messages.subscribe(messages => {
          console.log(messages);
        });
      } else {
        // Redirect back to previous page.
        this.router.navigate(['discords']);
      }
    });

  }


  create() {
    this.router.navigate(['message']);
  }
}
