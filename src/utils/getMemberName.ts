import { GuildMember } from "discord.js";

// Function to get member name
export default function getMemberName( guildMember: GuildMember ): string {
    return guildMember.nickname || guildMember.user.username;
}
