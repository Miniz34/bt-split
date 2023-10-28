import styles from "./PlayerCard.module.css";

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
            <div key={player._id} className={styles.carddata}>
              <p>Name: {player.name}</p>
              <p>Class: {player.class}</p>
              <p>token: {player.token}</p>
              <div>
                <p>Set:</p>
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
