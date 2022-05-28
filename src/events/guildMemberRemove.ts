import updateDatabase from "../utils/updateDatabase";

export default async function guildMemberRemove() {
    // Update records in the database
    await updateDatabase();

}
