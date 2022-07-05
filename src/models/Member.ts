import { Schema, model } from "mongoose";

const memberSchema: Schema = new Schema( { id: String, name: String }, { versionKey: false } );

export default model( "Member", memberSchema );
