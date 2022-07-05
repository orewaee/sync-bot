import { connect } from "mongoose";
import Member from "../models/Member";
import {logger} from "../main";

export default class Database {
    async connect() {
        await connect( process.env.MONGOOSE );
    }

    async checkMember( id: string ) {
        return !!await Member.findOne( { id } );
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
        const newMember = new Member( { id, name } );

        await newMember.save();

        logger.add( `Member ${ name } with id${ id } has been added to the database` );
    }

    async removeMember( id: string, name: string ) {
        await Member.find( { id, name } ).deleteOne();

        logger.remove( `Member ${ name } with id${ id } has been removed from the database` );
    }

    async compareMemberNames( id: string, name: string ) {
        return await this.getMemberName( id ) == name;
    }

    async updateMemberName( id: string, newName: string ) {
        const
            member = await Member.findOne( { id } ),
            oldName = member.name;

        member.name = newName;

        await member.save();

        logger.update( `Member name ${ oldName } from id${ id } has been updated to ${ newName }` );
    }
}