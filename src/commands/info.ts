import { MessageEmbed } from "discord.js";
import { getGuildsQuantity } from "../utils/getGuildsQuantity";
import { getMembersQuantity } from "../utils/getMembersQuantity";

export default async function info( interaction ) {
    const infoEmbed = new MessageEmbed()
        .setColor( "#FFFFFF" )
        .setTitle( "Info" )
        .addField( `:joystick: Guilds using the bot`, `At the moment, the bot is installed on ${ getGuildsQuantity() } guilds.` )
        .addField( `:package: Members stored in the database`, `There are currently ${ await getMembersQuantity() } members in the database.` );

    interaction.reply( {
        embeds: [ infoEmbed ]
    } );
}
