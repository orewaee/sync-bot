import { GuildMember, PartialGuildMember } from "discord.js";

export default function getMemberId( guildMember: GuildMember | PartialGuildMember ): string {
    return guildMember.user.id;
}
