import { isDevMode } from "@angular/core";

export enum BotUrls {
    DEVELOPMENT = "https://bot-dev.roach.buffsovernexus.com",
    PRODUCTION = "https://bot.roach.buffsovernexus.com"
}

export function getBotUrl() {
    if (isDevMode())
        return BotUrls.DEVELOPMENT
    else
        return BotUrls.PRODUCTION
}

export function getAuthPath() {
    if (isDevMode()) {
        return AuthPaths.LOCAL;
    } else {
        return AuthPaths.PRODUCTION;
    }
}

export enum BotPaths {
    DISCORD_GUILDS = "/discord/guilds",
    DISCORD_ROLES = "/discord/roles",
    DISCORD_EMOTES = "/discord/emotes",
    DISCORD_CHANNELS = "/discord/channels",
    DISCORD_MESSAGES = "/messages"
}

export enum RoachPaths {
    USER = "/user",
    GUILD = "/guild",
    MESSAGE = "/message",
    MESSAGES = "/messages",
    REACTION = "/reaction", // create reaction
    REACTIONS = "/reactions", // needs raw message id

}

export enum AuthPaths {
    LOCAL = "http://localhost:4200/auth",
    DEVELOPMENT = "https://roach-dev.buffsovernexus.com/auth",
    PRODUCTION = "https://roach.buffsovernexus.com/auth"
}