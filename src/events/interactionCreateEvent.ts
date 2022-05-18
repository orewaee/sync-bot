import { donorGuildId, ownerId } from "../../config.json";

import { Client, Collection, Guild, GuildMember, Interaction } from "discord.js";
import { updateAllGuilds } from "../utils/updateAllGuilds";
import { updateOneGuild } from "../utils/updateOneGuild";
import { getTime } from "../utils/getTime";
import { CallbackError, HydratedDocument } from "mongoose";
import Member from "../models/Member";

export async function interactionCreateEvent( client: Client, interaction: Interaction ) {
    if ( !interaction.isCommand() ) return;

    const { commandName, guildId } = interaction;

    if ( commandName == "sync" && guildId == donorGuildId ) {
        if ( !ownerId.includes( interaction.member.user.id ) ) return interaction.reply({
            content: "У вас нет прав.",
            ephemeral: true
        } );

        let donorGuild: Guild = client.guilds.cache.get( donorGuildId ),
            donorGuildMembers: Collection<string, GuildMember> = await donorGuild.members.fetch();

        donorGuildMembers.map( function ( guildMember: GuildMember ) {
            let id: string = guildMember.user.id,
                name: string = guildMember.nickname || guildMember.user.username;

            // Database query
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

        return interaction.reply( {
            content: "Дело сделано",
            ephemeral: true
        } );
    }

    if ( commandName == "sync" ) {
        updateOneGuild( client, guildId );

        interaction.reply( {
            content: "Дело сделано",
            ephemeral: true
        } );
    }
}
