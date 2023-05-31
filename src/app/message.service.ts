import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoachPaths, getBotUrl } from './boturls';
import { RoachMessage } from './models/discord-message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Get all messages in a guild
   * @param rawGuildId - The raw guild id from discord api
   * @returns - A list of all RoachMessages that exist within that Discord
   */
  getMessagesByRawGuildId(rawGuildId: string) {
    return this.httpClient.get<RoachMessage[]>(getBotUrl() + RoachPaths.MESSAGES, { params: { guildId: rawGuildId } });
  }

  /**
   * Persist a new RoachMessage to a Guild
   * @param rawGuildId - The guild id from discord api
   * @param subject - The subject of the message (aka the category of role reactions)
   * @returns - The submitted RoachMessage
   */
  createMessage(rawGuildId: string, subject: string) {
    const data = {
      guildId: rawGuildId,
      subject
    };
    return this.httpClient.post<RoachMessage>(getBotUrl() + RoachPaths.MESSAGE, data);
  }

  /**
   * Create or update all Roach role-reaction messages for the Discord.
   * @param messageId - The message id in reference (this automatically looks up the discord id)
   * @returns - A message letting us know it generated/regenerated all messages.
   */
  regenerateMessage(messageId: string) {
    const data = {
      messageId
    };
    return this.httpClient.post<string>(getBotUrl() + RoachPaths.MESSAGE + "/regenerate", data);
  }

  /**
   * Delete a Message (aka Category) from backend
   * @param messageId - The roach id of the message to delete
   * @returns - Determine if the message was deleted or not.
   */
  deleteMessage(messageId: string) {
    return this.httpClient.delete<boolean>(getBotUrl() + RoachPaths.MESSAGE, { params: { id: messageId }});
  }

  /**
   * Gather a specific RoachMessage
   * @param messageId - The Roach message id
   * @returns - The RoachMessage or nothing
   */
  getMessageById(messageId: string) {
    return this.httpClient.get<RoachMessage>(getBotUrl() + RoachPaths.MESSAGE, { params: { id: messageId }});
  }
}
