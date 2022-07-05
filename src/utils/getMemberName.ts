import { GuildMember, PartialGuildMember } from "discord.js";

export default function getMemberName( guildMember: GuildMember | PartialGuildMember ): string {
    return guildMember.nickname || guildMember.user.username;
}
