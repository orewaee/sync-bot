import { language } from "../../config.json";
import moment from "moment";

moment.locale( language );

export default class Logger {
    static getTime() {
        return moment().format( "LTS" );
    }

    info( message: any ): void {
        const prefix: string = "\x1b[34minfo\x1b[0m";

        console.info( "%s %s", prefix, message );
    }

    log( message: any ): void {
        const prefix: string = "log";

        console.info( "%s %s", prefix, message );
    }

    error( message: any ): void {
        const prefix: string = "\x1b[31merror\x1b[0m";

        console.error( "%s %s", prefix, message );
    }

    warn( message: any ): void {
        const prefix: string = "\x1b[33mwarn\x1b[0m";

        console.error( "%s %s", prefix, message );
    }

    success( message: any ): void {
        const prefix: string = "\x1b[32msuccess\x1b[0m";

        console.error( "%s %s", prefix, message );
    }

    change( message: string ): void {
        const prefix: string = "\x1b[33mchange\x1b[0m";

        console.log( "%s %s", prefix, message );
    }

    add( message: string ): void {
        const prefix: string = "\x1b[32madd\x1b[0m";

        console.log( "%s %s", prefix, message );
    }

    remove( message: string ): void {
        const prefix: string = "\x1b[31🔴 remove\x1b[0m";

        console.log( "%s %s", prefix, message );
    }

    // change, add, remove
}
