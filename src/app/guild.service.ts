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
    return this.httpClient.get<RoachGuild>(getBotUrl() + RoachPaths.GUILD + "/by-raw", { params: { guildId: rawId } });
  }

  /**
   * Gather all Discords owned by raw user id
   * @param rawId - raw user id from discord api
   * @returns - A list of discords
   */
  getDiscordsByRawUserId(rawId: string) {
    return this.httpClient.get<RoachGuild>(getBotUrl() + RoachPaths.USER + RoachPaths.GUILD, { params: { guildId: rawId } });
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

  /**
   * Update the Channel within a Guild
   * @param channelName - The new name of the channel
   * @param channelId - The channel id
   * @param rawGuildId - The guild id
   * @returns - The updated RoachGuild
   */
  updateChannel(channelName: string, channelId: string, rawGuildId: string) {
    const data = {
      channelName,
      channelId,
      guildId: rawGuildId
    };

    return this.httpClient.patch<RoachGuild>(getBotUrl() + RoachPaths.GUILD + RoachPaths.CHANNEL, data);
  }

  /**
   * Get a RoachGuild based on exact id
   * @param id - The Roach id of a guild
   * @returns - The existing RoachGuild
   */
  getGuildById(id: string) {
    return this.httpClient.get<RoachGuild>(getBotUrl() + RoachPaths.GUILD + "/by-id", { params: { guildId: id }});
  }
}
