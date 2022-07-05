import { donorGuildId } from "../config.json";
import { database } from "../main";
import { GuildMember, PartialGuildMember } from "discord.js";

import getMemberName from "../utils/getMemberName";
import getMemberId from "../utils/getMemberId";
import updateMemberNames from "../utils/updateMemberNames";

export default async function guildMemberUpdate( oldMember: GuildMember | PartialGuildMember, newMember: GuildMember ) {
    const isDonor = newMember.guild.id == donorGuildId;

    const
        id = getMemberId( newMember ),
        oldName = getMemberName( oldMember ),
        newName = getMemberName( newMember );

    if ( oldName == newName ) return;

    const
        memberExists = await database.checkMember( id ),
        namesMatch = memberExists ? await database.compareMemberNames( id, newName ) : false;

    if ( isDonor ) {
        if ( memberExists ) {
            if ( !namesMatch ) await database.updateMemberName( id, newName );
        } else await database.addMember( id, newName );

        updateMemberNames( newMember );
    }
}
