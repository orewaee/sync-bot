import { Client, Guild, GuildMember, Intents, Interaction } from "discord.js";
import ready from "../events/ready";
import guildMemberAdd from "../events/guildMemberAdd";
import guildMemberRemove from "../events/guildMemberRemove";
import guildMemberUpdate from "../events/guildMemberUpdate";
import guildCreate from "../events/guildCreate";
import guildDelete from "../events/guildDelete";
import interactionCreate from "../events/interactionCreate";
import sync from "../commands/sync";

export default class Bot extends Client {
    constructor() {
        super( { intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ] } );
    }

    async registerCommands() {
        let commands = this.application.commands;

        await commands.create( {
            name: "sync",
            description: "Sync names from the donor Discord server"
        } );

        await commands.create( {
            name: "info",
            description: "Get current information about the bot"
        } );
    }

    // Method that registers all events
    registerEvents() {
        // An event that fires when the bot starts
        this.on( "ready", ready );

        // Event that fires when a member joins a guild
        this.on( "guildMemberAdd", function ( member: GuildMember ) {
            guildMemberAdd( member );
        } );

        // An event that fires when a member leaves to join the guild
        this.on( "guildMemberRemove", function ( member: GuildMember ) {
            guildMemberRemove( member );
        } );

        // Event that fires when the state of a guild member changes
        this.on( "guildMemberUpdate", guildMemberUpdate );

        // Event that fires when a bot joins a guild
        this.on( "guildCreate", function ( guild: Guild ) {
            guildCreate( guild );
        } );

        // The event that fires when the bot leaves the guild
        this.on( "guildDelete", function ( guild: Guild ) {
            guildDelete( guild );
        } );

        this.on( "interactionCreate", function ( interaction: Interaction ) {
            interactionCreate( interaction );
        } );
    }

    // Method that starts the bot
    launch() {
        this.registerEvents();

        this.login( process.env.TOKEN );
    }
}
