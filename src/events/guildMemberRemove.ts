import {donorGuildId} from "../../config.json";
import {GuildMember} from "discord.js";
import updateDatabase from "../utils/updateDatabase";

export default async function guildMemberRemove( member: GuildMember ) {
    if ( member.guild.id == donorGuildId ) await updateDatabase();
}
