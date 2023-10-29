export const createPlayer = async (playerData: any) => {
  try {
    const currentDate = new Date();
    const isoDate = currentDate.toISOString();

    const getTokenType = (value: string) => {
      if (value === null) {
        return null;
      } else if (value === "Mage" || value === "Hunter" || value === "Druid") {
        return "Mystic";
      } else if (
        value === "Priest" ||
        value === "Paladin" ||
        value === "Shaman"
      ) {
        return "Venerated";
      } else if (
        value === "Monk" ||
        value === "Rogue" ||
        value === "Evoker" ||
        value === "Warrior"
      ) {
        return "Zenith";
      } else if (value === "DH" || value === "DK" || value === "Warlock") {
        return "Dreadful";
      } else {
        return null;
      }
    };

    const response = await fetch("/api/createPlayer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type for JSON data
      },
      body: JSON.stringify({
        name: playerData.name,
        class: playerData.class,
        role: playerData.role,
        token: getTokenType(playerData.class),
        alt: playerData.alt,
        altClass: playerData.altClass,
        raid: null,
        set: {
          head: null,
          shoulders: "NORMAL",
          chest: "MYTHIC",
          hands: "HEROIC",
          legs: "HEROIC",
        },
        lastModified: isoDate,
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
export const updatePlayer = async (newBeuteu: any, lastModified: any) => {
  try {
    const response = await fetch("/api/updatePlayer", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newBeuteu, lastModified }), // Send the new name in the request body
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
