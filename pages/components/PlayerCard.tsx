import styles from "./PlayerCard.module.css";
import { getBorderColor, getClassColor } from "../../utils/colors";

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

  return (
    <>
      <div className={styles.card}>
        {players && Array.isArray(players) ? (
          players.map((player: any) => (
            <div
              key={player._id}
              className={styles.carddata}
              style={{
                borderTop: "4px solid " + getBorderColor(player.class),
              }}
            >
              <p className={getClassColor(player.class)}>{player.name}</p>
              {/* <p>{player.class}</p> */}
              <p>{player.token}</p>
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
              <p>beuteu: {player.beuteu}</p>
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
