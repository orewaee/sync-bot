import { donorGuildId } from "../config.json";
import { database } from "../main";
import { GuildMember } from "discord.js";

import getMemberId from "../utils/getMemberId";
import getMemberName from "../utils/getMemberName";
import updateMemberName from "../utils/updateMemberName";
import updateMemberNames from "../utils/updateMemberNames";

export default async function guildMemberAdd( member: GuildMember ) {
    const isDonor = member.guild.id == donorGuildId;

    const
        id = getMemberId( member ),
        name = getMemberName( member );

    const
        memberExists = await database.checkMember( id ),
        namesMatch = memberExists ? await database.compareMemberNames( id, name ) : false;

    if ( isDonor ) {
        if ( memberExists ) {
            if ( !namesMatch ) await database.updateMemberName( id, name );
        } else await database.addMember( id, name );

        updateMemberNames( member );
    } else if ( memberExists && !namesMatch ) await updateMemberName( member );
}
