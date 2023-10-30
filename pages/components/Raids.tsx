import styles from "./Raids.module.css";
import { getBorderColor, getClassColor } from "../../utils/colors";

function Raids({ compo }: any) {
  interface Player {
    name: string;
    class: string;
    _id: string;
    main: {
      role: string;
      name: string;
      class: string;
      token: string;
      raid: number;
    };
    alt: {
      role: string;
      name: string;
      class: string;
      raid: number;
    };

    token: string;
    lastModified: string;
  }

  const raidUn = compo ? compo.filter((e: any) => e.raid === 2) : [];
  // const names = raidUn.flatMap((e: any) => {
  //   if (e.name) {
  //     return [e.name];
  //   } else if (e.alt && e.alt.name) {
  //     return [e.alt.name];
  //   }
  //   return [];
  // });
  // console.log("names liste :", names);

  const raidOne: any = [];

  if (compo) {
    compo.filter((char: any) => {
      if (char.main.raid === 1) {
        raidOne.push(char.main);
      } else if (char.alt.raid === 1) {
        raidOne.push(char.alt);
      }
    });
  }

  const raidTwo: any[] = [];

  if (compo) {
    compo.filter((char: any) => {
      if (char.main.raid === 2) {
        raidTwo.push(char.main);
      } else if (char.alt.raid === 2) {
        raidTwo.push(char.alt);
      }
    });
  }

  const sortedPlayersRaidOne = [...raidOne].sort((a, b) => {
    const roleOrder: { [key: string]: number } = {
      TANK: 1,
      HEALER: 2,
      RANGED_DPS: 3,
      MELEE_DPS: 4,
    };
    return roleOrder[a.role] - roleOrder[b.role];
  });

  const groupedPlayersRaidOne: Record<string, Player[]> = {};
  sortedPlayersRaidOne.forEach((player) => {
    const { role } = player;
    if (!groupedPlayersRaidOne[role]) {
      groupedPlayersRaidOne[role] = [];
    }
    groupedPlayersRaidOne[role].push(player);
  });

  const sortedPlayersRaidTwo = [...raidTwo].sort((a, b) => {
    const roleOrder: { [key: string]: number } = {
      TANK: 1,
      HEALER: 2,
      RANGED_DPS: 3,
      MELEE_DPS: 4,
    };
    return roleOrder[a.role] - roleOrder[b.role];
  });

  const groupedPlayersRaidTwo: Record<string, Player[]> = {};
  sortedPlayersRaidTwo.forEach((player) => {
    const { role } = player;
    if (!groupedPlayersRaidTwo[role]) {
      groupedPlayersRaidTwo[role] = [];
    }
    groupedPlayersRaidTwo[role].push(player);
  });

  const requiredPlayerClasses = [
    "Priest",
    "Druid",
    "Mage",
    "DH",
    "Warrior",
    "Warlock",
    "Monk",
  ];

  // Create an array to store missing player classes
  const missingPlayerClassesRaidOne = requiredPlayerClasses.filter(
    (className) => {
      // Check if any player in groupedPlayersRaidOne has the required class
      return !Object.values(groupedPlayersRaidOne).some((players) =>
        players.some((player) => player.class === className)
      );
    }
  );

  // Render the missing player classes
  const missingBuffsRaidOne = missingPlayerClassesRaidOne.map(
    (className, index) => (
      <span key={index} className={getClassColor(className)}>
        {className}
      </span>
    )
  );

  const missingPlayerClassesRaidTwo = requiredPlayerClasses.filter(
    (className) => {
      // Check if any player in groupedPlayersRaidTwo has the required class
      return !Object.values(groupedPlayersRaidTwo).some((players) =>
        players.some((player) => player.class === className)
      );
    }
  );

  // Render the missing player classes
  const missingBuffsRaidTwo = missingPlayerClassesRaidTwo.map(
    (className, index) => (
      <span key={index} className={getClassColor(className)}>
        {className}
      </span>
    )
  );

  const tokenToCountVeneratedOne = "Venerated";
  const veneratedCountOne = Object.values(groupedPlayersRaidOne).reduce(
    (count, players) => {
      return (
        count +
        players.filter((player) => player.token === tokenToCountVeneratedOne)
          .length
      );
    },
    0
  );

  const tokenToCountMysticOne = "Mystic";
  const mysticCountOne = Object.values(groupedPlayersRaidOne).reduce(
    (count, players) => {
      return (
        count +
        players.filter((player) => player.token === tokenToCountMysticOne)
          .length
      );
    },
    0
  );

  const tokenToCountDreadfulOne = "Dreadful";
  const dreadfulCountOne = Object.values(groupedPlayersRaidOne).reduce(
    (count, players) => {
      return (
        count +
        players.filter((player) => player.token === tokenToCountDreadfulOne)
          .length
      );
    },
    0
  );

  const tokenToCountZenithOne = "Zenith";
  const zenithCountone = Object.values(groupedPlayersRaidOne).reduce(
    (count, players) => {
      return (
        count +
        players.filter((player) => player.token === tokenToCountZenithOne)
          .length
      );
    },
    0
  );

  /////CUT HERE

  const tokenToCountVeneratedTwo = "Venerated";
  const veneratedCountTwo = Object.values(groupedPlayersRaidTwo).reduce(
    (count, players) => {
      return (
        count +
        players.filter((player) => player.token === tokenToCountVeneratedTwo)
          .length
      );
    },
    0
  );

  const tokenToCountMysticTwo = "Mystic";
  const mysticCountTwo = Object.values(groupedPlayersRaidTwo).reduce(
    (count, players) => {
      return (
        count +
        players.filter((player) => player.token === tokenToCountMysticTwo)
          .length
      );
    },
    0
  );

  const tokenToCountDreadfulTwo = "Dreadful";
  const dreadfulCountTwo = Object.values(groupedPlayersRaidTwo).reduce(
    (count, players) => {
      return (
        count +
        players.filter((player) => player.token === tokenToCountDreadfulTwo)
          .length
      );
    },
    0
  );

  const tokenToCountZenithTwo = "Zenith";
  const zenithCountTwo = Object.values(groupedPlayersRaidTwo).reduce(
    (count, players) => {
      return (
        count +
        players.filter((player) => player.token === tokenToCountZenithTwo)
          .length
      );
    },
    0
  );

  const mainsRaidOne = Object.values(groupedPlayersRaidOne).reduce(
    (count, players) => {
      return count + players.filter((player) => player.token).length;
    },
    0
  );

  const mainsRaidTwo = Object.values(groupedPlayersRaidTwo).reduce(
    (count, players) => {
      return count + players.filter((player) => player.token).length;
    },
    0
  );

  return (
    <>
      <div className={styles.raidscontainer}>
        <div>
          <h2 className={styles.raidtitle}>raid 1 ({mainsRaidOne} main)</h2>
          <div className={styles.raiddata}>
            <div className={styles.tokencount}>
              <p>Mystic : {mysticCountOne}</p>
              <p>Zenith : {zenithCountone}</p>
              <p>Dreadful : {dreadfulCountOne}</p>
              <p>Venerated : {veneratedCountOne}</p>
            </div>

            {/* Display missing buffs */}
            <div className={styles.missingbuff}>
              {missingBuffsRaidOne.length > 0 && (
                <div className="missing-buffs-label">Missing Buffs:</div>
              )}{" "}
              <div className={styles.missingbufflist}>
                {missingBuffsRaidOne}
              </div>
            </div>
          </div>

          {Object.keys(groupedPlayersRaidOne).map((role) => (
            <div key={role} className={styles.rolemain}>
              {/* <h3>
                {role} ({groupedPlayersRaidOne[role].length})
              </h3> */}
              <div className={styles.rolelist}>
                {groupedPlayersRaidOne[role].map((player) => (
                  <p key={player._id} className={getClassColor(player.class)}>
                    {player.name}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className={styles.raidtitle}>raid 2 ({mainsRaidTwo} main)</h2>
          <div className={styles.raiddata}>
            <div className={styles.tokencount}>
              <p>Mystic : {mysticCountTwo}</p>
              <p>Zenith : {zenithCountTwo}</p>
              <p>Dreadful : {dreadfulCountTwo}</p>
              <p>Venerated : {veneratedCountTwo}</p>
            </div>

            {/* Display missing buffs */}
            <div className={styles.missingbuff}>
              {missingBuffsRaidTwo.length > 0 && (
                <div className="missing-buffs-label">Missing Buffs:</div>
              )}
              <div className={styles.missingbufflist}>
                {missingBuffsRaidTwo}
              </div>
            </div>
          </div>
          {Object.keys(groupedPlayersRaidTwo).map((role) => (
            <div key={role} className={styles.rolemain}>
              {/* <h3>
                {role} ({groupedPlayersRaidTwo[role].length})
              </h3> */}
              <div className={styles.rolelist}>
                {groupedPlayersRaidTwo[role].map((player) => (
                  <p key={player._id} className={getClassColor(player.class)}>
                    {player.name}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Raids;
