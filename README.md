# sync-bot
Bot that synchronizes names with the donor Discord guild. It uses the node.js platform and is written in TypeScript. Yarn has been chosen as the package manager.

### Setting up the bot
Before launching the bot, make sure that you have enabled this option in your Discord bot settings.

![The very point](https://media.discordapp.net/attachments/722826865571528764/983445477527793685/unknown.png?width=1170&height=125)

You can make all other settings at your discretion.

### Launching the bot
In order to launch a bot and use it on your guilds, you must complete a few mandatory steps, described below.

1. First, install the source code from this repository, to do this, use the command `git clone https://github.com/orewaee/sync-bot.git`
2. After cloning the repository, use the `yarn install` command to install all required dependencies
3. Set up the necessary system variables: `TOKEN` (bot's Discord token) and `MONGOOSE` (database connection uri)
4. Customize the `config.json` file for you
5. Start the bot using the `yarn start` command
