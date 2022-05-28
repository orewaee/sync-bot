import { Guild } from "discord.js";
import { logger } from "../main";

export default function guildCreate( guild: Guild ) {
    const
        guildId: string = guild.id,
        guildName: string = guild.name,
        guildMemberCount: number = guild.memberCount;

    logger.add( `Connected new Discord server ${ guildName } with id ${ guildId } with ${ guildMemberCount } members` );

}
