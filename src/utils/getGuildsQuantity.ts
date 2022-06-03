import { bot } from "../main";

export function getGuildsQuantity(): number {
    let guilds = bot.guilds.cache,
        guildsQuantity: number = 0;

    guilds.map( i => guildsQuantity++ );

    return guildsQuantity;
}
