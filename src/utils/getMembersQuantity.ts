import Member from "../models/Member";

// Function to get the number of participants stored in the database
export async function getMembersQuantity() {
    let members = await Member.find( {} ),
        membersQuantity: number = 0;

    members.map( i => membersQuantity++ );

    return membersQuantity;
}
