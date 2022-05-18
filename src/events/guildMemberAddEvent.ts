import { Client, GuildMember } from "discord.js";
import { updateOneGuild } from "../utils/updateOneGuild";

export function guildMemberAddEvent( client: Client, guildMember: GuildMember ) {
    let guildId: string = guildMember.guild.id;

    updateOneGuild( client, guildId );
}
