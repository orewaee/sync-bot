import { Guild } from "discord.js";
import { logger } from "../main";

export default function guildDelete( guild: Guild ) {
    const
        guildId: string = guild.id,
        guildName: string = guild.name,
        guildMemberCount: number = guild.memberCount;

    logger.remove( `Discord server ${ guildName } with id ${ guildId } with members ${ guildMemberCount } is down` );

}
