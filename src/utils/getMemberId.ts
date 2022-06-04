import { GuildMember } from "discord.js";

// Function to get member id
export default function getMemberId( guildMember: GuildMember ): string {
    return guildMember.user.id;
}
