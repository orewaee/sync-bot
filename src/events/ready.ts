import { donorGuildId } from "../config.json";
import { logger, bot, database } from "../main";

import updateMemberNames from "../utils/updateMemberNames";
import getMemberId from "../utils/getMemberId";
import getMemberName from "../utils/getMemberName";

export default async function ready() {
    await bot.registerCommands();

    const
        donorGuild = bot.guilds.cache.get( donorGuildId ),
        members = await donorGuild.members.fetch();

    members.map( async function ( member ) {
        const
            id = getMemberId( member ),
            name = getMemberName( member );

        const
            memberExists = await database.checkMember( id ),
            namesMatch = memberExists ? await database.compareMemberNames( id, name ) : false;

        if ( memberExists ) {
            if ( !namesMatch ) await database.updateMemberName( id, name );
        } else await database.addMember( id, name );

        updateMemberNames( member );
    } );

    logger.success( "The bot has been successfully launched. Source code on GitHub https://github.com/orewaee/sync-bot" );
    logger.info( "To add him to the guild, use this link", bot.getInvite() );
    logger.info( "If you have any questions, please contact Telegram https://t.me/orewaee or create an issue on GitHub https://github.com/orewaee/sync-bot/issues" );
}
