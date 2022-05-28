import Member from "../models/Member";
import { logger } from "../main";
import { connect } from "mongoose";
import { GuildMember } from "discord.js";
import getMemberId from "../utils/getMemberId";

type filterType = {
    id: string
    name?: string
}

export default class Database {
    async connect() {
        await connect( process.env.MONGOOSE );
    }

    async checkMember( filter: filterType ) {
        return !!await Member.findOne( filter );
    }

    async getMemberId( name: string ) {
        const { id } = await Member.findOne( { name } );

        return id;
    }

    async getMemberName( id: string ) {
        const { name } = await Member.findOne( { id } );

        return name;
    }

    async addMember( id: string, name: string ) {
        // if ( await this.checkMember( id, name ) ) return;

        const newMemberDocument = new Member( { id, name } );

        await newMemberDocument.save();

        logger.add( `🟢 Member ${ name } with id ${ id } was successfully added to the database` );
    }

    async removeMember( id: string, name: string ) {
        // if ( !await this.checkMember( { id, name } ) ) return;

        await Member.find( { id, name } ).deleteOne();

        logger.remove( `Member ${ name } with id ${ id } was successfully removed from the database` );
    }

    async compareMemberNames( id: string, name: string ) {
        // if ( !await this.checkMember( { id, name } ) ) return;

        return await this.getMemberName( id ) == name;
    }

    async updateMemberName( id: string, newName: string ) {
        // if ( await this.checkMember( id, newName ) ) return;

        const memberDocument = await Member.findOne( { id } );

        const oldName = memberDocument.name;

        memberDocument.name = newName;

        await memberDocument.save();


        logger.change( `🟡 Principal name ${ oldName } with id ${ id } was successfully changed in the database to ${ newName }` );

    }

    async removeUnusedEntries( members ) {
        const documents = await Member.find( {} );

        documents.map( async function ( memberDocument ) {
            let counter: number = 0;

            members.map( function ( member: GuildMember ) {
                const id: string = getMemberId( member );

                if ( memberDocument.id == id ) counter++;
            } );

            if ( counter != 0 ) return;

            await Member.findOne( { id: memberDocument.id, name: memberDocument.name } ).deleteOne();

            logger.remove( `Member ${ memberDocument.name } with id ${ memberDocument.id } was successfully removed from the database` );

        } );
    }
}
