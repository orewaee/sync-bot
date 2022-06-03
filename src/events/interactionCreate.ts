import { Interaction } from "discord.js";
import sync from "../commands/sync";
import info from "../commands/info";

export default async function interactionCreate( interaction: Interaction ) {
    if ( !interaction.isCommand() ) return;

    const { commandName } = interaction;

    switch ( commandName ) {
        case "sync":
            await sync( interaction );
            break;

        case "info":
            info( interaction );
            break;

    }
}
