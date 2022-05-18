import { MessageEmbed } from "discord.js";
import { getGuildsQuantity } from "../utils/getGuildsQuantity";
import {getMembersQuantity} from "../utils/getMembersQuantity";

export async function infoCommand( client, interaction ) {
    const infoEmbed = new MessageEmbed()
        .setColor( "#FFFFFF" )
        .setTitle( "Информация" )
        .addField( `:joystick: Сервера, использующие бота`, `На данный момент, бот установлен на ${ getGuildsQuantity( client ) } серверах.` )
        .addField( `:package: Пользователи, сохранённые в базе данных`, `На данный момент, в базе данных сохранено ${ await getMembersQuantity() } пользователей.` );

    interaction.reply( {
        embeds: [ infoEmbed ]
    } );
}
