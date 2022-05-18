import { donorGuildId } from "../../config.json";

import { Client, GuildMember, PartialGuildMember } from "discord.js";
import { updateAllGuilds } from "../utils/updateAllGuilds";
import { getTime } from "../utils/getTime";
import { CallbackError, HydratedDocument } from "mongoose";
import Member from "../models/Member";

export function guildMemberUpdateEvent( client: Client, oldMember: GuildMember | PartialGuildMember, newMember: GuildMember ) {
    let guildId: string = oldMember.guild.id;

    if ( guildId == donorGuildId ) {
        let id: string = newMember.user.id,
            oldName: string = oldMember.nickname || oldMember.user.username,
            newName: string = newMember.nickname || newMember.user.username;

        Member.findOne( { id }, function ( e: CallbackError, memberDocument: HydratedDocument<any> ) {
            if ( !memberDocument ) {
                const newMemberDocument = new Member( { id, name: newName } );

                newMemberDocument.save( function ( e ) {
                    if ( e ) return console.error( "[%s] [Err] Error adding member to database.", getTime(), e );

                    console.log( "[%s] [Log] Member %s with id %s was successfully added to the database", getTime(), newName, id );
                } );

                return;
            }

            if ( oldName != newName && memberDocument.name != newName ) {
                memberDocument.name = newName;

                memberDocument.save( function ( e ) {
                    if ( e ) return console.error( "[%s] [Err] Error updating member in database.", getTime(), e );

                    console.log( "[%s] [Log] Member %s with id %s was successfully updated in the database, new name is %s", getTime(), oldName, id, newName );

                    updateAllGuilds( client );
                } );
            }
        } );
    }
}
