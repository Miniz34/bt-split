import styles from "./PlayerCard.module.css";
import { getBorderColor, getClassColor } from "../../utils/colors";
import { setRaidOne } from "../../utils//managePlayer"; // Replace with your API client

function PlayerCard({ players }: any) {
  const getSetItemClassName = (value: string) => {
    if (value === null) {
      return styles.red;
    } else if (value === "NORMAL") {
      return styles.yellow;
    } else if (value === "HEROIC") {
      return styles.orange;
    } else if (value === "MYTHIC") {
      return styles.green;
    } else {
      return styles.blackk;
    }
  };

  console.log("Received players data:", players);

  async function updateRaidForPlayer(
    playerId: any,
    raidOneValue: number,
    raidTwoValue: number
  ) {
    try {
      const response = await setRaidOne(playerId, raidOneValue, raidTwoValue);
      if (response.ok) {
        console.log("Raid updated successfully");
      } else {
        console.error("Failed to update raid");
      }
    } catch (error) {
      console.error("Error updating raid:", error);
    }
  }

  return (
    <>
      <div className={styles.card}>
        {players && Array.isArray(players) ? (
          players.map((player: any) => (
            <div
              key={player._id}
              className={styles.carddata}
              style={{
                borderTop: "4px solid " + getBorderColor(player.main.class),
              }}
            >
              <p className={getClassColor(player.main.class)}>
                {player.main.name}
              </p>
              {/* <p>{player.class}</p> */}
              <p>{player.main.token}</p>
              <p className={getClassColor(player.alt.Class)}>
                {player.alt.name}
              </p>
              <p> {player.alt.Class}</p>
              <p>{player.main.role}</p>

              {/* <p>{player.lastModified}</p> */}
              <div>
                <p></p>
                <ul>
                  {Object.keys(player.set).map((setItem) => (
                    <li
                      key={setItem}
                      className={getSetItemClassName(player.set[setItem])}
                    >
                      {setItem}: {player.set[setItem]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.buttons}>
                <button
                  className={styles.button}
                  onClick={(e) => {
                    updateRaidForPlayer(player._id, 1, 2);
                  }}
                >
                  {" "}
                  1
                </button>
                <button
                  className={styles.button}
                  onClick={(e) => {
                    updateRaidForPlayer(player._id, 2, 1);
                  }}
                >
                  2
                </button>
              </div>
            </div>
          ))
        ) : (
          // Handle the case when players is not an array
          <p>Invalid players data</p>
        )}
      </div>
    </>
  );
}

export default PlayerCard;
