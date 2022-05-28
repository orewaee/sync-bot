import updateDatabase from "../utils/updateDatabase";

export default async function guildMemberUpdate() {
    // Update records in the database
    await updateDatabase();

}
