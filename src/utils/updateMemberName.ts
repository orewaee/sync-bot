import { database, logger } from "../main";
import { GuildMember } from "discord.js";

import getMemberId from "./getMemberId";

export default async function updateMemberName( guildMember: GuildMember ) {
    const
        id = getMemberId( guildMember ),
        name = await database.getMemberName( id );

    if ( guildMember.guild.ownerId == id ) return;

    try {
        await guildMember.setNickname( name, "Syncs names" );
    } catch ( e ) {
        logger.error( `Error changing ${ name } member name with id ${ id }` );
    }
}
