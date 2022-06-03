import { donorGuildId } from "../../config.json";
import updateDatabase from "../utils/updateDatabase";
import updateAllGuilds from "../utils/updateAllGuilds";
import updateOneGuildOld from "../utils/updateOneGuild";

export default async function sync( interaction ) {
    const guild = interaction.guild;

    if ( guild.id == donorGuildId ) {
        await updateDatabase();
        await updateAllGuilds();
    } else {
        await updateOneGuildOld( guild );
    }

    interaction.reply( {
        content: "It is done",
        ephemeral: true
    } );
}
