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
}
