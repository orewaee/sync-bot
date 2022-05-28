import { logger, bot } from "../main";
import updateDatabase from "../utils/updateDatabase";
import updateAllGuilds from "../utils/updateAllGuilds";
import generateInvitationLink from "../utils/generateInvitationLink";

export default async function ready() {
    // Update records in the database
    await updateDatabase();

    // Update names in all guilds
    await updateAllGuilds();

    await bot.registerCommands();

    // Console message about bot launch
    logger.info( `✨ The bot has been successfully launched, to add it to the server, use this link ${ generateInvitationLink() }. If you have any questions please contact https://t.me/orewaee` );

}
