import { donorGuildId } from "../../config.json";
import { GuildMember } from "discord.js";
import updateDatabase from "../utils/updateDatabase";
import updateAllGuilds from "../utils/updateAllGuilds";

export default async function guildMemberUpdate( member: GuildMember ) {
    if ( member.guild.id == donorGuildId ) {
        await updateDatabase();
        await updateAllGuilds();
    }
}
