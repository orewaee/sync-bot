import { Interaction } from "discord.js";
import sync from "../commands/sync";

export default function interactionCreate( interaction: Interaction ) {
    if ( !interaction.isCommand() ) return;

    const { commandName } = interaction;

    if ( commandName == "sync" ) return sync( interaction );

}
