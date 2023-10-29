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
        playerId: 34,
        main: {
          name: playerData.name,
          class: playerData.class,
          role: playerData.role,
          token: getTokenType(playerData.class),
          raid: 2,
        },
        alt: {
          name: playerData.alt,

          //TODO remove caps class
          Class: playerData.altClass,
          role: playerData.altRole,
          raid: 1,
        },

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

// export const setRaidOne = async (raidOneValue: number, raidTwoValue: number) => {
//   try {
//     const response = await fetch("/api/updateRaid", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ raidOneValue, raidTwoValue }),
//     });
//     if (response.ok) {
//       // Handle successful update here
//       console.log("Player name updated successfully");
//     } else {
//       console.error("Failed to update player name");
//     }
//   } catch (error) {
//     console.error("Error updating player name:", error);
//   }
// };

export async function setRaidOne(
  playerId: any,
  raidOneValue: number,
  raidTwoValue: number
) {
  try {
    const response = await fetch("/api/updateRaid", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerId, raidOneValue, raidTwoValue }),
    });
    return response;
  } catch (error) {
    console.error("Error updating raid:", error);
    return { ok: false };
  }
}
