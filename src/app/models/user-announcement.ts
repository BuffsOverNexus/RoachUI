import { Announcement } from "./announcement";
import { RoachUser } from "./roach-user";

export interface UserAnnouncement extends Announcement {
    user: RoachUser
}