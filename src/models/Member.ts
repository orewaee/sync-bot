import { Schema, model } from "mongoose";

const memberSchema: Schema = new Schema( {
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
} );

export default model( "Member", memberSchema );
