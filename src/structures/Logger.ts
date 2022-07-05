import moment from "moment";

moment.locale( "ru" )

export default class Logger {
    getTime() {
        return moment().format( "LTS" );
    }

    info( ...args: any[] ) {
        console.info( "\x1b[34minfo\x1b[0m", args.join( " " ) );
    }

    success( ...args: any[] ) {
        console.info( "\x1b[32msuccess\x1b[0m", args.join( " " ) );
    }

    error( ...args: any[] ) {
        console.info( "\x1b[31merror\x1b[0m", args.join( " " ) );
    }

    add( ...args: any[] ) {
        console.info( "\x1b[32madd\x1b[0m", args.join( " " ) );
    }

    remove( ...args: any[] ) {
        console.info( "\x1b[31mremove\x1b[0m", args.join( " " ) );
    }

    update( ...args: any[] ) {
        console.info( "\x1b[33mupdate\x1b[0m", args.join( " " ) );
    }
}
