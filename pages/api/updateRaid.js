import { connectToDatabase } from "../../lib/mongodbjs";
const { ObjectId } = require('mongodb'); // Import the ObjectId from the 'mongodb' library


export default async function handler(req, res) {
  try {
    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

    const { playerId, raidOneValue, raidTwoValue } = req.body; // Extract playerId, raid values from the request body

    // Log the received data for debugging
    console.log("Received data - playerId:", playerId, "raidOneValue:", raidOneValue, "raidTwoValue:", raidTwoValue);

    // Define the query to find the player by _id
    const playerIdObject = ObjectId(playerId);

    const query = { _id: playerIdObject };

    // Log the query and update operation for debugging
    // console.log("Query:", query);
    const updateOperation = {
      $set: { "main.raid": raidOneValue, "alt.raid": raidTwoValue },
    };
    // console.log("Update Operation:", updateOperation);

    // Update the player's raid values
    const result = await collection.updateOne(query, updateOperation);

    // Log the result for debugging
    console.log("Update Result:", result);

    res.status(200).json({ message: 'Raid Updated' });
  } catch (error) {
    console.error('Error setting raid', error);
    res.status(500).json({ message: 'Error updating raid' });
  }
}