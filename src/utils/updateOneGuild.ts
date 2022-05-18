import Member from "../models/Member";

export async function updateOneGuild( client, guildId ) {
    let guild = client.guilds.cache.get( guildId ),
        guildMembers = await guild.members.fetch();

    guildMembers.map( function ( guildMember ) {
        let id = guildMember.user.id,
            name = guildMember.nickname || guildMember.user.username;

        if ( guild.ownerId == id ) return;

        Member.findOne( { id }, async function ( e, member ) {
            if ( !member ) return;

            if ( member.name == name ) return;

            try {
                await guildMember.setNickname( member.name, "Nickname synchronization" );
            } catch ( e ) {
                return;
            }
        } );
    } );
}