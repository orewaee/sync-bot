import { donorGuildId } from "../../config.json";
import { GuildMember } from "discord.js";
import { database, bot } from "../main";
import getMemberId from "./getMemberId";
import getMemberName from "./getMemberName";

// Function to update records in database based on donor guild
export default async function updateDatabase() {
    const members = await bot.guilds.cache.get( donorGuildId ).members.fetch();

    members.map( async function ( member: GuildMember ) {
        const
            id: string = getMemberId( member ),
            name: string = getMemberName( member );

        // If the member is not in the database, then it is added to it
        if ( !await database.checkMember( { id } ) ) return await database.addMember( id, name );

        // If the name in the guild matches the name from the database, then nothing happens
        if ( await database.compareMemberNames( id, name ) ) return;

        // If the first two checks fail, then the participant name in the database is updated
        await database.updateMemberName( id, name );
    } );

    // Remove unused entries
}
