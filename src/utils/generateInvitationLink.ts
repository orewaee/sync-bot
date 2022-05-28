import { Permissions } from "discord.js";
import { bot } from "../main";

export default function generateInvitationLink(): string {
    return bot.generateInvite( {
        permissions: [
            Permissions.FLAGS.MANAGE_NICKNAMES,
            Permissions.FLAGS.CHANGE_NICKNAME
        ],
        scopes: [ "bot", "applications.commands" ]
    } );

}
