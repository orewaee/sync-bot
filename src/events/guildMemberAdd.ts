import updateDatabase from "../utils/updateDatabase";
import updateAllGuilds from "../utils/updateAllGuilds";

export default async function guildMemberAdd() {
    // Update records in the database
    await updateDatabase();

    // Update names in all guilds
    await updateAllGuilds();

}
