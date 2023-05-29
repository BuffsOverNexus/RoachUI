import { isDevMode } from "@angular/core";

export enum BotUrls {
    DEVELOPMENT = "https://bot-dev.roach.buffsovernexus.com",
    PRODUCTION = "https://bot.roach.buffsovernexus.com"
}

export function getBotUrl() {
    // if (isDevMode())
    //     return BotUrls.DEVELOPMENT
    // else
    //     return BotUrls.PRODUCTION
    return BotUrls.DEVELOPMENT;
}

export function getAuthPath() {
    if (isDevMode())
        return AuthPaths.LOCAL;
    else
        return AuthPaths.DEVELOPMENT;
    // if (isDevMode()) {
    //     return AuthPaths.DEVELOPMENT;
    // } else {
    //     return AuthPaths.PRODUCTION;
    // }
}

export function getAuthUrl() {
    if (isDevMode()) 
        return AuthUrls.LOCAL;
    else
        return AuthUrls.DEVELOPMENT;
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

export enum AuthUrls {
    LOCAL = "https://discord.com/api/oauth2/authorize?client_id=1105618210545475597&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fauth&response_type=code&scope=identify%20email&state=",
    DEVELOPMENT = "https://discord.com/api/oauth2/authorize?client_id=1105618210545475597&redirect_uri=https%3A%2F%2Froach-dev.buffsovernexus.com%2Fauth&response_type=code&scope=identify%20email&state=",
    PRODUCTION = "https://discord.com/api/oauth2/authorize?client_id=1105618210545475597&redirect_uri=https%3A%2F%2Froach.buffsovernexus.com%2Fauth&response_type=code&scope=identify%20email&state="
}