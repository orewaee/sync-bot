import moment from "moment";
import "moment/locale/ru";

moment.locale( "ru" );

export function getTime() {
    return moment().format( "LTS" );
}
