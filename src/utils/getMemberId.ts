import { GuildMember } from "discord.js";

export default function getMemberId( guildMember: GuildMember ): string {
    return guildMember.user.id;
}
