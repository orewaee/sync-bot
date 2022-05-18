import "dotenv/config";

import { Client, Intents } from "discord.js";
import { readyEvent } from "./events/readyEvent";
import { guildCreateEvent } from "./events/guildCreateEvent";
import { interactionCreateEvent } from "./events/interactionCreateEvent";
import { guildMemberUpdateEvent } from "./events/guildMemberUpdateEvent";
import { guildMemberAddEvent } from "./events/guildMemberAddEvent";
import { connect } from "mongoose";

const client: Client = new Client( { intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ] } );

connect( process.env.MONGOOSE );

client.on( "ready", function () {
    readyEvent( client );
} );

client.on( "guildCreate", function ( guild ) {
    guildCreateEvent( client, guild );
} );

client.on( "interactionCreate", function ( interaction ) {
    interactionCreateEvent( client, interaction );
} );

client.on( "guildMemberUpdate", function ( oldMember, newMember ) {
    guildMemberUpdateEvent( client, oldMember, newMember );
} );

client.on( "guildMemberAdd", function ( guildMember ) {
    guildMemberAddEvent( client, guildMember );
} );

client.login( process.env.TOKEN );
