import Member from "../models/Member";

export async function getMembersQuantity() {
    let members = await Member.find( {} ),
        membersQuantity: number = 0;

    members.map( i => membersQuantity++ );

    return membersQuantity;
}
