import { donorGuildId } from "../../config.json";

import { ApplicationCommandManager, Client, Collection, Guild, GuildMember } from "discord.js";
import { updateAllGuilds } from "../utils/updateAllGuilds";
import { generateInviteLink } from "../utils/generateInviteLink";
import { getTime } from "../utils/getTime";
import { CallbackError, HydratedDocument } from "mongoose";
import Member from "../models/Member";

export async function readyEvent( client: Client ) {
    let donorGuild: Guild = client.guilds.cache.get( donorGuildId ),
        donorGuildMembers: Collection<string, GuildMember> = await donorGuild.members.fetch();

    donorGuildMembers.map( function ( guildMember: GuildMember ) {
        let id: string = guildMember.user.id,
            name: string = guildMember.nickname || guildMember.user.username;

        Member.findOne( { id }, function ( e: CallbackError, memberDocument: HydratedDocument<any> ) {
            if ( !memberDocument ) {
                const newMemberDocument = new Member( { id, name } );

                newMemberDocument.save( function ( e ) {
                    if ( e ) return console.error( "[%s] [Err] Error adding member to database.", getTime(), e );

                    console.log( "[%s] [Log] Member %s with id %s was successfully added to the database", getTime(), name, id );
                } );

                return;
            }

            if ( memberDocument.name != name ) {
                let oldName = memberDocument.name;
                memberDocument.name = name;

                memberDocument.save( function ( e ) {
                    if ( e ) return console.error( "[%s] [Err] Error updating member in database.", getTime(), e );

                    console.log( "[%s] [Log] Member %s with id %s was successfully updated in the database, new name is %s", getTime(), oldName, id, name );
                } );
            }
        } );
    } );

    updateAllGuilds( client );

    let commands: ApplicationCommandManager = client.application.commands;

    await commands.create( {
        name: "sync",
        description: "Sync roles and nicknames from the donor Discord server"
    } );

    console.log( "\n[%s] [Log] Sync bot launched. Invitation link: %s", getTime(), generateInviteLink( client ), "\n" );
}
