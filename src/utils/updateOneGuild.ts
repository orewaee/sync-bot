import { donorGuildId } from "../../config.json";
import { Guild, GuildMember } from "discord.js";
import { database } from "../main";
import getMemberId from "./getMemberId";
import getMemberName from "./getMemberName";

// Name update function in one guild
export default async function updateOneGuild( guild: Guild ) {
    // If the guild is a donor, then nothing happens
    if ( guild.id == donorGuildId ) return;

    const guildMembers = await guild.members.fetch();

    guildMembers.map( async function ( guildMember: GuildMember ) {
        const
            id: string = getMemberId( guildMember ),
            name: string = getMemberName( guildMember );

        // You can not change the nickname of the owner of the guild discord
        if ( guild.ownerId == id ) return;

        // If the member is not in the database, then nothing happens
        if ( !await database.checkMember( { id } ) ) return;

        // If the name in the guild matches the name from the database, then nothing happens
        if ( await database.compareMemberNames( id, name ) ) return;

        // If the first two checks fail, then the name of the member in the guild is updated
        await guildMember.setNickname( await database.getMemberName( id ), "Nickname syncs" );
    } );
}
