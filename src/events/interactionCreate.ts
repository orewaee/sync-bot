import { donorGuildId } from "../config.json";
import { Interaction } from "discord.js";
import { bot, database } from "../main";

import getMemberId from "../utils/getMemberId";
import getMemberName from "../utils/getMemberName";
import updateMemberNames from "../utils/updateMemberNames";
import updateMemberName from "../utils/updateMemberName";

export default async function interactionCreate( interaction: Interaction ) {
    if ( !interaction.isCommand() ) return;

    const { commandName, guild } = interaction;

    const isDonor = guild.id == donorGuildId;

    if ( commandName == "sync" ) {
        if ( isDonor ) {
            const
                donorGuild = bot.guilds.cache.get( donorGuildId ),
                members = await donorGuild.members.fetch();

            members.map( async function ( member ) {
                const
                    id = getMemberId( member ),
                    name = getMemberName( member );

                const
                    memberExists = await database.checkMember( id ),
                    namesMatch = memberExists ? await database.compareMemberNames( id, name ) : false;

                if ( memberExists ) {
                    if ( !namesMatch ) await database.updateMemberName( id, name );
                } else await database.addMember( id, name );

                updateMemberNames( member );
            } );
        } else {
            const members = await guild.members.fetch()

            members.map( async function ( member ) {
                const
                    id = getMemberId( member ),
                    name = getMemberName( member );

                const
                    memberExists = await database.checkMember( id ),
                    namesMatch = memberExists ? await database.compareMemberNames( id, name ) : false;

                if ( memberExists && !namesMatch ) await updateMemberName( member );
            } );
        }

        await interaction.reply( { content: "It is done. If you have any problems, contact Telegram https://t.me/orewaee", ephemeral: true } )
    }
}
