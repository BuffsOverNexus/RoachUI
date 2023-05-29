import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBotUrl, RoachPaths } from './boturls';
import { RoachGuild } from './models/roach-guild';

/**
 * This service is used for access Roach's guild information
 */
@Injectable({
  providedIn: 'root'
})
export class GuildService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Gather a Discord based on raw id
   * @param rawId - The raw discord id from discord api
   * @returns - The edited guild that Roach found.
   */
  getDiscordByRawId(rawId: string) {
    return this.httpClient.get<RoachGuild>(getBotUrl() + RoachPaths.GUILD + `/${rawId}`);
  }

  /**
   * Gather all Discords owned by raw user id
   * @param rawId - raw user id from discord api
   * @returns - A list of discords
   */
  getDiscordsByRawUserId(rawId: string) {
    return this.httpClient.get<RoachGuild>(getBotUrl() + RoachPaths.USER + RoachPaths.GUILD + `/${rawId}`);
  }


  /**
   * Persist a Discord entity.
   * @param rawUserId - The raw user id from discord api
   * @param rawGuildId - The raw guild id from discord api
   * @param guildName - The name of the guild
   * @param channelName - The name of the text channel for Roach to produce messages to
   * @param rawChannelId - The raw id of the text channel
   * @returns - The saved entity in the database
   */
  createDiscord(rawUserId: string, rawGuildId: string, guildName: string, channelName: string, rawChannelId: string) {
    const data = {
      userId: rawUserId,
      guildId: rawGuildId,
      guildName,
      channelName,
      channelId: rawChannelId
    };

    return this.httpClient.post<RoachGuild>(getBotUrl() + RoachPaths.GUILD, data);
  }

  // TODO: Add an API endpoint to update channel id. (Reference: Issue #12)
}
