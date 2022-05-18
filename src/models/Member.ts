import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema( {
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
} );

export default model( "Member", userSchema );
