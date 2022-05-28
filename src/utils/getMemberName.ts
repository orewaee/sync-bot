import { GuildMember } from "discord.js";

export default function getMemberName( guildMember: GuildMember ): string {
    return guildMember.nickname || guildMember.user.username;
}
