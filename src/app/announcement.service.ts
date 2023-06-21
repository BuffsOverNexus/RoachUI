import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Announcement } from './models/announcement';
import { RoachApiPaths, getRoachApiUrl } from './boturls';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Gather all announcements
   * @returns - Announcement[] - All announcements saved in RoachAPI
   */
  getAllAnnouncements() {
    return this.httpClient.get<Announcement[]>(getRoachApiUrl() + RoachApiPaths.ANNOUNCEMENTS);
  }

  /**
   * Create a new announcement
   * @param userId - The user's non-raw id from Roach
   * @param title - The title
   * @param content - The content (in markdown)
   * @returns - The saved announcement
   */
  createAnnouncement(userId: string, title: string, content: string) {
    return this.httpClient.post<Announcement>(getRoachApiUrl() + RoachApiPaths.ANNOUNCEMENT, { userId, title, content })
  }

  /**
   * Delete an announcement
   * @param id - The announcement's id
   * @returns - The deleted announcement
   */
  deleteAnnouncement(id: number) {
    return this.httpClient.delete<Announcement>(getRoachApiUrl() + RoachApiPaths.ANNOUNCEMENT, { body: { id }});
  }
}
