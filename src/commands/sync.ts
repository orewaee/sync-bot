import { donorGuildId } from "../../config.json";
import updateDatabase from "../utils/updateDatabase";
import updateAllGuilds from "../utils/updateAllGuilds";
import updateOneGuildOld from "../utils/updateOneGuild";

export default async function sync( guild ) {
    if ( guild.id != donorGuildId ) return await updateOneGuildOld( guild );

    await updateDatabase();
    await updateAllGuilds();
}
