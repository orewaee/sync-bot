export function getGuildsQuantity( client ): number {
    let guilds = client.guilds.cache,
        guildsQuantity: number = 0;

    guilds.map( i => guildsQuantity++ );

    return guildsQuantity;
}