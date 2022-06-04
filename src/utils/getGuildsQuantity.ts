import { bot } from "../main";

// Function to get the number of guilds the bot is on
export function getGuildsQuantity(): number {
    let guilds = bot.guilds.cache,
        guildsQuantity: number = 0;

    guilds.map( i => guildsQuantity++ );

    return guildsQuantity;
}
