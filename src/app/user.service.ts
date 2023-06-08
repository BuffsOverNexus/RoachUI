import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoachUser } from './models/roach-user';
import { RoachPaths, getBotUrl } from './boturls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Get an existing User
   * @param rawId - The user's raw id from discord api
   * @returns - The user's details from Roach
   */
  getUserByRawId(rawId: string) {
    return this.httpClient.get<RoachUser>(getBotUrl() + RoachPaths.USER + `/${rawId}`);
  }

  /**
   * Create a new User
   * @param rawId - a user's raw id from discord api
   * @param name - the name of the user
   * @returns - The saved details from Roach
   */
  createUser(rawId: string, name: string) {
    const data = {
      rawId,
      name
    };
    return this.httpClient.post<RoachUser>(getBotUrl() + RoachPaths.USER, data);
  }

  /**
   * Updates the last login for the user
   * @param rawId - The user's raw id
   * @returns - The RoachUser object
   */
  updateLastLogin(rawId: string) {
    return this.httpClient.patch<RoachUser>(getBotUrl() + RoachPaths.USER + `/lastLogin`, {}, { params: { userId: rawId } });
  }

}
