import { Guild } from "discord.js";
import { bot } from "../main";
import updateOneGuildOld from "./updateOneGuild";

// Name update function in all guilds
export default async function updateAllGuilds() {
    bot.guilds.cache.map( function ( guild: Guild ) {
        updateOneGuildOld( guild );
    } );
}
