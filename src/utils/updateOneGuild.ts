import { donorGuildId } from "../../config.json";
import { Guild, GuildMember } from "discord.js";
import { database, bot } from "../main";
import getMemberId from "./getMemberId";
import getMemberName from "./getMemberName";

// The function of updating the names of all members in the same guild
export default async function updateOneGuild( guildId: string ) {
    if ( guildId == donorGuildId ) return;

    const
        guild = bot.guilds.cache.get( guildId ),
        guildMembers = await guild.members.fetch(),
        guildOwnerId = guild.ownerId;

    /*
    const
        guildMembers = guild.members.cache,
        guildOwnerId = guild.ownerId;
    */

    guildMembers.map( async function ( guildMember: GuildMember ) {
        const
            memberId: string = getMemberId( guildMember ),
            memberName: string = getMemberName( guildMember );

        if ( guildOwnerId == memberId ) return;

        if ( !await database.checkMember( { id: memberId } ) ) return;

        if ( await database.compareMemberNames( memberId, memberName ) ) return;

        await guildMember.setNickname( await database.getMemberName( memberId ), "Nickname syncs" );
    } );

}
