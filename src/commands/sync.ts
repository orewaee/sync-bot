import { donorGuildId } from "../../config.json";
import updateDatabase from "../utils/updateDatabase";
import updateAllGuilds from "../utils/updateAllGuilds";
import updateOneGuild from "../utils/updateOneGuild";

export default async function sync( guildId ) {
    if ( guildId == donorGuildId ) {
        // Update records in the database
        await updateDatabase();

        // Update names in all guilds
        await updateAllGuilds();
    } else {
        await updateOneGuild( guildId );
    }

}
