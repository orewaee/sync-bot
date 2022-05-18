import { Permissions } from "discord.js";

interface IOptions {
    permissions: any[],
    scopes: string[]
}

const options: IOptions = {
    permissions: [
        Permissions.FLAGS.ADMINISTRATOR,
        Permissions.FLAGS.MANAGE_NICKNAMES,
        Permissions.FLAGS.CHANGE_NICKNAME
    ],
    scopes: [ "bot", "applications.commands" ]
}

export function generateInviteLink( client: any ): string {
    return client.generateInvite( options );
}
