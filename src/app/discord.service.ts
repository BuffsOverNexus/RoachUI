import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BotPaths, getBotUrl } from './boturls';
import { DiscordGuild } from './models/discord_guild';
import { DiscordRole } from './models/discord-role';
import { DiscordEmote } from './models/discord-emote';
import { DiscordChannel } from './models/discord-channel';

/**
 * This service is to access general discord api information via Roach
 */
@Injectable({
  providedIn: 'root'
})
export class DiscordService {

  constructor(private httpClient: HttpClient) { }

  getDiscordsByUser(rawUserId: string) {
    console.log(getBotUrl() + BotPaths.DISCORD_GUILDS + `?userId=${rawUserId}`);
    return this.httpClient.get<DiscordGuild[]>(getBotUrl() + BotPaths.DISCORD_GUILDS + `?userId=${rawUserId}`);
  }

  getRolesInDiscord(rawGuildId: string) {
    return this.httpClient.get<DiscordRole[]>(getBotUrl() + BotPaths.DISCORD_ROLES, { params: { guildId: rawGuildId } });
  }

  getEmotesInDiscord(rawGuildId: string) {
    return this.httpClient.get<DiscordEmote[]>(getBotUrl() + BotPaths.DISCORD_EMOTES, { params: { guildId: rawGuildId } });
  }

  getChannelsInDiscord(rawGuildId: string) {
    return this.httpClient.get<DiscordChannel[]>(getBotUrl() + BotPaths.DISCORD_CHANNELS, { params: { guildId: rawGuildId } });
  }
}
