import { donorGuildId } from "../config.json";
import { database } from "../main";
import { GuildMember, PartialGuildMember } from "discord.js";

import getMemberId from "../utils/getMemberId";
import getMemberName from "../utils/getMemberName";

export default async function guildMemberRemove( member: GuildMember | PartialGuildMember ) {
    const isDonor = member.guild.id == donorGuildId;

    const
        id = getMemberId( member ),
        name = getMemberName( member );

    const memberExists = await database.checkMember( id );

    if ( isDonor && memberExists ) await database.removeMember( id, name );
}
