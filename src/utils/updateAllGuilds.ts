import { updateOneGuild } from "./updateOneGuild";

export async function updateAllGuilds( client ) {
    let guilds = client.guilds.cache;

    guilds.map( function ( item ) {
        let guildId = item.id;

        updateOneGuild( client, guildId );
    } );
}