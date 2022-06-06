import { language } from "../../config.json";
import moment from "moment";

moment.locale( language );

export default class Logger {
    getTime() {
        return moment().format( "LTS" );
    }

    info( message: any ): void {
        const prefix: string = "\x1b[34minfo\x1b[0m";

        console.info( "%s %s %s", this.getTime(), prefix, message );
    }

    log( message: any ): void {
        const prefix: string = "log";

        console.info( "%s %s %s", this.getTime(), prefix, message );
    }

    error( message: any ): void {
        const prefix: string = "\x1b[31merror\x1b[0m";

        console.error( "%s %s %s", this.getTime(), prefix, message );
    }

    warn( message: any ): void {
        const prefix: string = "\x1b[33mwarn\x1b[0m";

        console.error( "%s %s %s", this.getTime(), prefix, message );
    }

    success( message: any ): void {
        const prefix: string = "\x1b[32msuccess\x1b[0m";

        console.error( "%s %s %s", this.getTime(), prefix, message );
    }

    change( message: string ): void {
        const prefix: string = "\x1b[33mchange\x1b[0m";

        console.log( "%s %s %s", this.getTime(), prefix, message );
    }

    add( message: string ): void {
        const prefix: string = "\x1b[32madd\x1b[0m";

        console.log( "%s %s %s", this.getTime(), prefix, message );
    }

    remove( message: string ): void {
        const prefix: string = "\x1b[31remove\x1b[0m";

        console.log( "%s %s %s", this.getTime(), prefix, message );
    }
}
