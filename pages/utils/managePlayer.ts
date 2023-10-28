import Player from "../interface/Player"; // Import the Player interface

export const createPlayer = async (playerData: Player) => {
  try {
    const response = await fetch("/api/createPlayer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type for JSON data
      },
      body: JSON.stringify({
        name: playerData.name,
        class: playerData.class,
        token: playerData.token,
        alt: playerData.alt,
        set: {
          head: null,
          shoulders: "NORMAL",
          chest: "MYTHIC",
          hands: "HEROIC",
          legs: "HEROIC",
        },
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Player created:", result);
    } else {
      console.error("Failed to create player");
    }
  } catch (error) {
    console.error("Error creating player:", error);
  }
};

//TODO
export const updatePlayer = async (newBeuteu: any) => {
  try {
    const response = await fetch("/api/updatePlayer", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newBeuteu }), // Send the new name in the request body
    });

    if (response.ok) {
      // Handle successful update here
      console.log("Player name updated successfully");
    } else {
      console.error("Failed to update player name");
    }
  } catch (error) {
    console.error("Error updating player name:", error);
  }
};
