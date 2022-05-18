import { ApplicationCommandManager } from "discord.js";

export async function createCommands( commands: ApplicationCommandManager ) {
    await commands.create( {
        name: "info",
        description: "Get current information about the bot"
    } );

    await commands.create( {
        name: "sync",
        description: "Sync nicknames from the donor Discord server"
    } );
}
