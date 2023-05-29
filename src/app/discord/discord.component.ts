import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoachMessage } from '../models/discord-message';
import { RoachGuild } from '../models/roach-guild';
import { MessageService } from '../message.service';
import { GuildService } from '../guild.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-discord',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.css']
})
export class DiscordComponent implements OnInit{

  constructor(private route: ActivatedRoute, private guildService: GuildService, private messageService: MessageService) {}

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
      }
    });

  }

  selectMessage(message: RoachMessage) {

  }
}
