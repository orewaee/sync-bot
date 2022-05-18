import { Client } from "discord.js";
import {syncCommand} from "../commands/syncCommand";
import {infoCommand} from "../commands/infoCommand";

export async function commandHandler( client: Client, interaction ) {
    if ( !interaction.isCommand() ) return;

    const { commandName, guildId } = interaction;

    if ( commandName == "sync" ) {
        syncCommand( client, interaction, guildId );
    }

    if ( commandName == "info" ) {
        infoCommand( client, interaction );
    }
}