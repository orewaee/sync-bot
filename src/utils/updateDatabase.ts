import { donorGuildId } from "../../config.json";
import { GuildMember } from "discord.js";
import { database, bot } from "../main";
import getMemberId from "./getMemberId";
import getMemberName from "./getMemberName";

// Function to update records in database based on donor guild
export default async function updateDatabase() {
    // Getting a variable with donor guild members
    const members = await bot.guilds.cache.get( donorGuildId ).members.fetch();

    members.map( async function ( member: GuildMember ) {
        // Getting the id and name of a guild member
        const
            id: string = getMemberId( member ),
            name: string = getMemberName( member );

        if ( !await database.checkMember( { id } ) ) return await database.addMember( id, name );

        if ( await database.compareMemberNames( id, name ) ) return;

        await database.updateMemberName( id, name );
    } );

    await database.removeUnusedEntries( members );
}
