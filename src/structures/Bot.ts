import { Client, Intents, Permissions } from "discord.js";

import ready from "../events/ready";
import guildMemberAdd from "../events/guildMemberAdd";
import guildMemberRemove from "../events/guildMemberRemove";
import guildMemberUpdate from "../events/guildMemberUpdate";
import interactionCreate from "../events/interactionCreate";

export default class Bot extends Client {
    constructor() {
        super( { intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ], partials: [ "GUILD_MEMBER", "MESSAGE" ] } );
    }

    getInvite(): string {
        return this.generateInvite( {
            permissions: [ Permissions.FLAGS.MANAGE_NICKNAMES, Permissions.FLAGS.CHANGE_NICKNAME ],
            scopes: [ "bot", "applications.commands" ]
        } );
    }

    async registerCommands() {
        let commands = this.application.commands;

        await commands.create( {
            name: "sync",
            description: "Sync names from the donor Discord server"
        } );
    }

    registerEvents() {
        this.on( "ready", function () {
            ready();
        } );

        this.on( "guildMemberAdd", function ( member ) {
            guildMemberAdd( member );
        } );

        this.on( "guildMemberRemove", function ( member ) {
            guildMemberRemove( member );
        } );

        this.on( "guildMemberUpdate", function ( oldMember, newMember ) {
            guildMemberUpdate( oldMember, newMember );
        } );

        this.on( "interactionCreate", function ( interaction ) {
            interactionCreate( interaction );
        } );
    }

    launch() {
        this.registerEvents();

        this.login( process.env.TOKEN );
    }
}
