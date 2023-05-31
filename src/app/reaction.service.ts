import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoachReaction } from './models/roach-reaction';
import { RoachPaths, getBotUrl } from './boturls';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  constructor(private httpClient: HttpClient) { }

  getReactionsByGuildId(rawId: string) {
    return this.httpClient.get<RoachReaction[]>(getBotUrl() + RoachPaths.REACTIONS + "/by-guild", { params: { guildId: rawId }});
  }

  getReactionsByMessageRawId(rawId: string) {
    return this.httpClient.get<RoachReaction[]>(getBotUrl() + RoachPaths.REACTIONS, { params: { messageId: rawId }});
  }

  getReactionsByMessage(id: string) {
    return this.httpClient.get<RoachReaction[]>(getBotUrl() + RoachPaths.REACTIONS + "/by-id", { params: { messageId: id }});
  }

  createReactionById(messageId: string, rawGuildId: string, rawEmoteId: string, rawRoleId: string, roleName: string) {
    const data = {
      messageId,
      guildId: rawGuildId,
      emoteId: rawEmoteId,
      roleId: rawRoleId,
      roleName
    };
    return this.httpClient.post<RoachReaction>(getBotUrl() + RoachPaths.REACTION, data);
  }

  deleteReaction(reactionId: string) {
    return this.httpClient.delete<RoachReaction>(getBotUrl() + RoachPaths.REACTION, { params: { reactionId } });
  }
}
