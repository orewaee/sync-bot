import { Guild } from "discord.js";
import { bot } from "../main";
import updateOneGuild from "./updateOneGuild";

// Function to update the names of all members in all guilds
export default async function updateAllGuilds() {
    // Getting a variable with all guilds
    const guilds = bot.guilds.cache;

    guilds.map( function ( guild: Guild ) {
        let guildId = guild.id;

        updateOneGuild( guildId );
    } );

}
