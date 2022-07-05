import { donorGuildId } from "../config.json";
import { bot } from "../main";
import { Guild, GuildMember } from "discord.js";

import updateMemberName from "./updateMemberName";

export default function updateMemberNames( guildMember: GuildMember ) {
    const guilds = bot.guilds.cache;

    guilds.map( async function ( guild: Guild ) {
        if ( guild.id == donorGuildId ) return;

        const members = await guild.members.fetch();

        const foundMember = members.get( guildMember.user.id );

        if ( foundMember ) await updateMemberName( foundMember );
    } );
}
