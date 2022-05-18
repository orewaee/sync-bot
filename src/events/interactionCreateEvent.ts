import { donorGuildId, ownerId } from "../../config.json";

import { Client, Interaction } from "discord.js";
import { commandHandler } from "../handlers/commandHandler";

export async function interactionCreateEvent( client: Client, interaction: Interaction ) {
    commandHandler( client, interaction );
}
