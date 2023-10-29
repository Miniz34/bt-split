
import { connectToDatabase } from "../../lib/mongodbjs";


export default async function handler(req, res) {


  if (req.method === "POST") {

    try {
      const { database } = await connectToDatabase();
      const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

      // Parse the JSON data from the request body
      const playerData = req.body;

      // Insert the player data into the MongoDB collection
      const result = await collection.insertOne(playerData);

      res.status(201).json({ message: "Player created" });
    } catch (error) {
      console.error("Error creating player:", error);
      res.status(500).json({ message: "Error creating player" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

//i/

