import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {

  try {
    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

    const { newBeuteu } = req.body; // Extract the new name from the request body

    // Your logic to find the player you want to update (e.g., by player ID)
    // Update the player's name
    // You should implement this part based on your database structure

    const query = { name: 'Miniz' };

    // Define the update operation
    const updateOperation = {
      $set: { beuteu: newBeuteu },
    };

    // Update the player's name
    const result = await collection.updateOne(query, updateOperation);

    res.status(200).json({ message: 'Player name updated successfully' });
  } catch (error) {
    console.error('Error updating player name:', error);
    res.status(500).json({ message: 'Error updating player name' });
  }

}