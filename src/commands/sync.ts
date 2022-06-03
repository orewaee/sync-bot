import { donorGuildId, confidants } from "../../config.json";
import updateDatabase from "../utils/updateDatabase";
import updateAllGuilds from "../utils/updateAllGuilds";
import updateOneGuildOld from "../utils/updateOneGuild";
import getMemberId from "../utils/getMemberId";

export default async function sync( interaction ) {
    const
        guild = interaction.guild,
        member = interaction.member;

    if ( guild.id == donorGuildId ) {
        if ( !confidants.includes( getMemberId( member ) ) ) return interaction.reply( {
            content: "You don't have enough rights",
            ephemeral: true
        } );

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
