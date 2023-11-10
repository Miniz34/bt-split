// import { connectToDatabase } from "../../lib/mongodbjs";

// export default async function handler(req, res) {

//   try {
//     const { database } = await connectToDatabase();
//     const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

//     const { newBeuteu, lastModify } = req.body; // Extract the new name from the request body

//     // Your logic to find the player you want to update (e.g., by player ID)
//     // Update the player's name
//     // You should implement this part based on your database structure

//     const query = { name: 'Miniz' };

//     // Define the update operation
//     const updateOperation = {
//       $set: { beuteu: newBeuteu, lastModify: lastModify },
//     };

//     // Update the player's name
//     const result = await collection.updateOne(query, updateOperation);

//     res.status(200).json({ message: 'Player name updated successfully' });
//   } catch (error) {
//     console.error('Error updating player name:', error);
//     res.status(500).json({ message: 'Error updating player name' });
//   }

// }




import { connectToDatabase } from "../../lib/mongodbjs";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { database } = await connectToDatabase();
      const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

      // Parse the JSON data from the request body
      const playerData = req.body;

      // Extract the _id from the playerData
      const playerId = playerData._id;

      // Create a filter to find the player by _id
      const filter = { _id: new ObjectId(playerId) };

      // Exclude _id from the update operation
      const { _id, ...updateData } = playerData;

      // Define the update operation
      const updateOperation = {
        $set: updateData,
      };

      // Use updateOne with the filter and update operation
      const result = await collection.updateOne(filter, updateOperation);

      if (result.matchedCount === 1) {
        console.log(`Player with _id ${playerId} updated. Modified ${result.modifiedCount} document(s).`);
        res.status(200).json({ message: "Player updated" });
      } else {
        console.error(`Player with _id ${playerId} not found.`);
        res.status(404).json({ message: "Player not found" });
      }
    } catch (error) {
      console.error("Error updating player:", error);
      res.status(500).json({ message: "Error updating player" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}