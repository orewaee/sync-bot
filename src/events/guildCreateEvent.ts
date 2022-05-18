import { Client, Guild } from "discord.js";
import { updateOneGuild } from "../utils/updateOneGuild";

export function guildCreateEvent( client: Client, guild: Guild ) {
    let guildName: string = guild.name,
        guildId: string = guild.id,
        guildMemberCount: number = guild.memberCount;

    updateOneGuild( client, guildId );

    console.log( "Connected new Discord server %s with id %s with %d members", guildName, guildId, guildMemberCount );
}
