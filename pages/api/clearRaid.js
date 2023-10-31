import { connectToDatabase } from "../../lib/mongodbjs";
const { ObjectId } = require('mongodb'); // Import the ObjectId from the 'mongodb' library


export default async function handler(req, res) {
  try {
    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);


    // Log the received data for debugging

    // Define the query to find the player by _id

    const query = {}; // Empty query matches all documents

    // Log the query and update operation for debugging
    // console.log("Query:", query);
    const updateOperation = {
      $set: { "main.raid": null, "alt.raid": null },
    };
    // console.log("Update Operation:", updateOperation);

    // Update the player's raid values
    const result = await collection.updateMany(query, updateOperation);

    // Log the result for debugging

    res.status(200).json({ message: 'Raid Deleted' });
  } catch (error) {
    console.error('Error setting raid', error);
    res.status(500).json({ message: 'Error updating raid' });
  }
}