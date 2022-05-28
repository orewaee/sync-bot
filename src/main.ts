import "dotenv/config";
import Logger from "./structures/Logger";
import Bot from "./structures/Bot";
import Database from "./structures/Database";

export const
    logger: Logger = new Logger(),
    database: Database = new Database(),
    bot: Bot = new Bot();

database.connect();
bot.launch();
