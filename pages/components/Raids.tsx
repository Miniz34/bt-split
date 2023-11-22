import styles from "./Raids.module.css";
import { getBorderColor, getClassColor } from "../../utils/colors";
import { useState } from "react";

import {
  GiCenturionHelmet,
  GiSpikedShoulderArmor,
  GiChestArmor,
  GiWinterGloves,
} from "react-icons/gi";
import { PiPantsFill } from "react-icons/pi";

function Raids({ compo, toggleIcons }: any) {
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
    set: any;

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
  const raidOneToken: any = [];

  const [difficultyToken, setDifficultyToken] = useState("HEROIC");

  // if (compo) {
  //   compo.filter((char: any) => {
  //     if (char.main.raid === 1) {
  //       raidOne.push(char.main);
  //       raidOneToken.push(char.main, char.set);
  //     } else if (char.alt.raid === 1) {
  //       raidOne.push(char.alt);
  //     }
  //   });
  // }

  if (compo) {
    compo.forEach((char: any) => {
      if (char.main.raid === 1) {
        // Include char.set into char.main
        char.main.set = char.set;
        raidOne.push(char.main);
        raidOneToken.push(char.main);
      } else if (char.alt.raid === 1) {
        raidOne.push(char.alt);
      }
    });
  }

  const raidTwo: any[] = [];
  const raidTwoToken: any[] = [];

  // if (compo) {
  //   compo.filter((char: any) => {
  //     if (char.main.raid === 2) {
  //       raidTwo.push(char.main);
  //     } else if (char.alt.raid === 2) {
  //       raidTwo.push(char.alt);
  //     }
  //   });
  // }

  if (compo) {
    compo.forEach((char: any) => {
      if (char.main.raid === 2) {
        // Include char.set into char.main
        char.main.set = char.set;
        raidTwo.push(char.main);
        raidTwoToken.push(char.main);
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

  console.log(raidOneToken);

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

  console.log("grouped 1", groupedPlayersRaidOne);
  console.log("sorted 1", sortedPlayersRaidOne);

  const groupedPlayersRaidTwo: Record<string, Player[]> = {};
  sortedPlayersRaidTwo.forEach((player) => {
    const { role } = player;
    if (!groupedPlayersRaidTwo[role]) {
      groupedPlayersRaidTwo[role] = [];
    }
    groupedPlayersRaidTwo[role].push(player);
  });

  console.log("grouped 2", groupedPlayersRaidTwo);
  console.log("sorted 2", sortedPlayersRaidTwo);
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

  console.log(groupedPlayersRaidOne);

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

  const tokenCountsOne = {
    Venerated: 0,
    Mystic: 0,
    Dreadful: 0,
    Zenith: 0,
  };

  Object.keys(tokenCountsOne).forEach((token) => {
    /*@ts-ignore*/
    tokenCountsOne[token] = Object.values(groupedPlayersRaidOne).reduce(
      (count, players) => {
        return (
          count + players.filter((player) => player.token === token).length
        );
      },
      0
    );
  });

  const tokenCountsTwo = {
    Venerated: 0,
    Mystic: 0,
    Dreadful: 0,
    Zenith: 0,
  };

  Object.keys(tokenCountsTwo).forEach((token) => {
    /*@ts-ignore*/
    tokenCountsTwo[token] = Object.values(groupedPlayersRaidTwo).reduce(
      (count, players) => {
        return (
          count + players.filter((player) => player.token === token).length
        );
      },
      0
    );
  });

  // const partCounts = {
  //   chest: 0,
  //   hands: 0,
  //   head: 0,
  //   legs: 0,
  //   shoulders: 0,
  // };

  const tokenPartCountsRaidOne: { [key: string]: { [key: string]: number } } =
    {};

  // Iterate through the raidOneToken data
  raidOneToken.forEach((entry: any) => {
    const { set, token } = entry;
    // Check if the token is not null or "NULL"
    if (token !== null && token !== "NULL") {
      if (!tokenPartCountsRaidOne[token]) {
        tokenPartCountsRaidOne[token] = {
          chest: 0,
          hands: 0,
          head: 0,
          legs: 0,
          shoulders: 0,
        };
      }

      // Iterate through the set object and increment the counts for each part per token
      Object.entries(set).forEach(([part, value]) => {
        if (value !== null && value !== "NULL") {
          tokenPartCountsRaidOne[token][part] += 1;
        }
      });
    }
  });

  //Vérifier par difficulté : TokenparsCountsRaidOneMythic > foreach

  const tokenPartCountsRaidOneNormal: {
    [key: string]: { [key: string]: number };
  } = {};

  // Iterate through the raidOneToken data
  raidOneToken.forEach((entry: any) => {
    const { set, token } = entry;
    // Check if the token is not null or "NULL"
    if (token !== null && token !== "NULL") {
      if (!tokenPartCountsRaidOneNormal[token]) {
        tokenPartCountsRaidOneNormal[token] = {
          chest: 0,
          hands: 0,
          head: 0,
          legs: 0,
          shoulders: 0,
        };
      }

      // Iterate through the set object and increment the counts for each part per token
      Object.entries(set).forEach(([part, value]) => {
        if (value == "NORMAL" || value == "HEROIC" || value == "MYTHIC") {
          tokenPartCountsRaidOneNormal[token][part] += 1;
        }
      });
    }
  });

  const tokenPartCountsRaidOneHeroic: {
    [key: string]: { [key: string]: number };
  } = {};

  // Iterate through the raidOneToken data
  raidOneToken.forEach((entry: any) => {
    const { set, token } = entry;
    // Check if the token is not null or "NULL"
    if (token !== null && token !== "NULL") {
      if (!tokenPartCountsRaidOneHeroic[token]) {
        tokenPartCountsRaidOneHeroic[token] = {
          chest: 0,
          hands: 0,
          head: 0,
          legs: 0,
          shoulders: 0,
        };
      }

      // Iterate through the set object and increment the counts for each part per token
      Object.entries(set).forEach(([part, value]) => {
        if (value === "HEROIC" || value === "MYTHIC") {
          tokenPartCountsRaidOneHeroic[token][part] += 1;
        }
      });
    }
  });

  const tokenPartCountsRaidOneMythic: {
    [key: string]: { [key: string]: number };
  } = {};

  // Iterate through the raidOneToken data
  raidOneToken.forEach((entry: any) => {
    const { set, token } = entry;
    // Check if the token is not null or "NULL"
    if (token !== null && token !== "NULL") {
      if (!tokenPartCountsRaidOneMythic[token]) {
        tokenPartCountsRaidOneMythic[token] = {
          chest: 0,
          hands: 0,
          head: 0,
          legs: 0,
          shoulders: 0,
        };
      }

      // Iterate through the set object and increment the counts for each part per token
      Object.entries(set).forEach(([part, value]) => {
        if (value === "MYTHIC") {
          tokenPartCountsRaidOneMythic[token][part] += 1;
        }
      });
    }
  });

  const tokenPartCountsRaidTwoNormal: {
    [key: string]: { [key: string]: number };
  } = {};

  // Iterate through the raidTwoToken data
  raidTwoToken.forEach((entry: any) => {
    const { set, token } = entry;
    // Check if the token is not null or "NULL"
    if (token !== null && token !== "NULL") {
      if (!tokenPartCountsRaidTwoNormal[token]) {
        tokenPartCountsRaidTwoNormal[token] = {
          chest: 0,
          hands: 0,
          head: 0,
          legs: 0,
          shoulders: 0,
        };
      }

      // Iterate through the set object and increment the counts for each part per token
      Object.entries(set).forEach(([part, value]) => {
        if (value == "NORMAL" || value === "HEROIC" || value === "MYTHIC") {
          tokenPartCountsRaidTwoNormal[token][part] += 1;
        }
      });
    }
  });

  const tokenPartCountsRaidTwoHeroic: {
    [key: string]: { [key: string]: number };
  } = {};

  // Iterate through the raidTwoToken data
  raidTwoToken.forEach((entry: any) => {
    const { set, token } = entry;
    // Check if the token is not null or "NULL"
    if (token !== null && token !== "NULL") {
      if (!tokenPartCountsRaidTwoHeroic[token]) {
        tokenPartCountsRaidTwoHeroic[token] = {
          chest: 0,
          hands: 0,
          head: 0,
          legs: 0,
          shoulders: 0,
        };
      }

      // Iterate through the set object and increment the counts for each part per token
      Object.entries(set).forEach(([part, value]) => {
        if (value === "HEROIC" || value === "MYTHIC") {
          tokenPartCountsRaidTwoHeroic[token][part] += 1;
        }
      });
    }
  });

  const tokenPartCountsRaidTwoMythic: {
    [key: string]: { [key: string]: number };
  } = {};

  // Iterate through the raidTwoToken data
  raidTwoToken.forEach((entry: any) => {
    const { set, token } = entry;
    // Check if the token is not null or "NULL"
    if (token !== null && token !== "NULL") {
      if (!tokenPartCountsRaidTwoMythic[token]) {
        tokenPartCountsRaidTwoMythic[token] = {
          chest: 0,
          hands: 0,
          head: 0,
          legs: 0,
          shoulders: 0,
        };
      }

      // Iterate through the set object and increment the counts for each part per token
      Object.entries(set).forEach(([part, value]) => {
        if (value === "MYTHIC") {
          tokenPartCountsRaidTwoMythic[token][part] += 1;
        }
      });
    }
  });

  const tokenPartMaxRaidOne: { [key: string]: { [key: string]: number } } = {};

  // Iterate through the raidOneToken data
  raidOneToken.forEach((entry: any) => {
    const { set, token } = entry;
    // Check if the token is not null or "NULL"
    if (!tokenPartMaxRaidOne[token]) {
      tokenPartMaxRaidOne[token] = {
        chest: 0,
        hands: 0,
        head: 0,
        legs: 0,
        shoulders: 0,
      };
    }

    // Iterate through the set object and increment the counts for each part per token
    Object.entries(set).forEach(([part]) => {
      tokenPartMaxRaidOne[token][part] += 1;
    });
  });

  const tokenPartCountsRaidTwo: { [key: string]: { [key: string]: number } } =
    {};

  // Iterate through the raidTwoToken data
  raidTwoToken.forEach((entry: any) => {
    const { set, token } = entry;
    // Check if the token is not null or "NULL"
    if (token !== null && token !== "NULL") {
      if (!tokenPartCountsRaidTwo[token]) {
        tokenPartCountsRaidTwo[token] = {
          chest: 0,
          hands: 0,
          head: 0,
          legs: 0,
          shoulders: 0,
        };
      }

      // Iterate through the set object and increment the counts for each part per token
      Object.entries(set).forEach(([part, value]) => {
        if (value !== null && value !== "NULL") {
          tokenPartCountsRaidTwo[token][part] += 1;
        }
      });
    }
  });

  const tokenPartMaxRaidTwo: { [key: string]: { [key: string]: number } } = {};

  // Iterate through the raidTwoToken data
  raidTwoToken.forEach((entry: any) => {
    const { set, token } = entry;
    // Check if the token is not null or "NULL"
    if (!tokenPartMaxRaidTwo[token]) {
      tokenPartMaxRaidTwo[token] = {
        chest: 0,
        hands: 0,
        head: 0,
        legs: 0,
        shoulders: 0,
      };
    }

    // Iterate through the set object and increment the counts for each part per token
    Object.entries(set).forEach(([part]) => {
      tokenPartMaxRaidTwo[token][part] += 1;
    });
  });

  const partIcons = {
    head: <GiCenturionHelmet />,
    shoulders: <GiSpikedShoulderArmor />,
    chest: <GiChestArmor />,
    hands: <GiWinterGloves />,
    legs: <PiPantsFill />,
  };

  function getMissingPartsForToken(
    token: any,
    tokenPartMax: any,
    tokenPartCounts: any
  ) {
    const orderOfParts = ["head", "shoulders", "chest", "hands", "legs"];
    const missingParts = {};

    orderOfParts.forEach((part) => {
      const max = tokenPartMax[token][part];
      const owned = tokenPartCounts[token][part];
      const missing = max - owned;
      // @ts-ignore
      missingParts[part] = missing;
    });

    return missingParts;
  }

  // console.log(tokenPartMaxRaidOne);

  console.log("grouped players raid ONE", groupedPlayersRaidOne);

  return (
    <>
      <div className={styles.raidscontainer}>
        <div className={styles.singleraidscontainer}>
          <div className={`${styles.singleraid} ${styles.singleraidone}`}>
            <h2 className={styles.raidtitle}>raid 1 ({mainsRaidOne} main)</h2>
            <div className={styles.rolecontainer}>
              <div>
                {Object.keys(groupedPlayersRaidOne).map((role) => (
                  <div key={role} className={styles.rolemain}>
                    {/* <h3>
                {role} ({groupedPlayersRaidOne[role].length})
              </h3> */}
                    <div className={styles.rolelist}>
                      {groupedPlayersRaidOne[role].map((player) => (
                        <p
                          key={player._id}
                          className={`${getClassColor(player.class)} ${
                            styles.playerinraid
                          } ${player.set ? styles.hasSet : ""}`}
                        >
                          {player.name}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.missingbuff}>
              {missingBuffsRaidOne.length > 0 ? (
                <>
                  {missingBuffsRaidOne.length > 0 && (
                    <div className={styles.nobuff}>Missing Buffs:</div>
                  )}
                  <div className={styles.missingbufflist}>
                    {missingBuffsRaidOne}
                  </div>
                </>
              ) : (
                <div className={styles.allbuffs}>GG full buff big damouge</div>
              )}
            </div>

            {/* RAID 1 */}

            {/*END RAID 1 */}
          </div>
          <div className={styles.singleraid}>
            <h2 className={styles.raidtitle}>raid 2 ({mainsRaidTwo} main)</h2>
            <div className={styles.rolecontainer}>
              <div>
                {Object.keys(groupedPlayersRaidTwo).map((role) => (
                  <div key={role} className={styles.rolemain}>
                    {/* <h3>
                {role} ({groupedPlayersRaidTwo[role].length})
              </h3> */}
                    <div className={styles.rolelist}>
                      {groupedPlayersRaidTwo[role].map((player) => (
                        <p
                          key={player._id}
                          className={`${getClassColor(player.class)} ${
                            styles.playerinraid
                          } ${player.set ? styles.hasSet : ""}`}
                        >
                          {player.name}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.missingbuff}>
              {missingBuffsRaidTwo.length > 0 ? (
                <>
                  {missingBuffsRaidTwo.length > 0 && (
                    <div className={styles.nobuff}>Missing Buffs:</div>
                  )}
                  <div className={styles.missingbufflist}>
                    {missingBuffsRaidTwo}
                  </div>
                </>
              ) : (
                <div className={styles.allbuffs}>GG full buff big damouge</div>
              )}
            </div>

            {/* RAID 2 */}

            {/*  END RAID 2 */}
          </div>
        </div>

        <div className={styles.raiddatacontainer}>
          <div className={styles.raidattrib}>
            <div className={styles.raidone}>
              <p>
                Mystic : <GiCenturionHelmet />: <GiSpikedShoulderArmor />:{" "}
                <GiChestArmor />: <GiWinterGloves />: <PiPantsFill />:
              </p>
              <p>
                Zenith : <GiCenturionHelmet />: <GiSpikedShoulderArmor />:{" "}
                <GiChestArmor />: <GiWinterGloves />: <PiPantsFill />:{" "}
              </p>
              <p>
                Dreadful : <GiCenturionHelmet />: <GiSpikedShoulderArmor />:{" "}
                <GiChestArmor />: <GiWinterGloves />: <PiPantsFill />:{" "}
              </p>
              <p>
                Venerated : <GiCenturionHelmet />: <GiSpikedShoulderArmor />:{" "}
                <GiChestArmor />: <GiWinterGloves />: <PiPantsFill />:
              </p>
            </div>
            <div className={styles.raidone}>
              <p>
                Mystic : <GiCenturionHelmet />: <GiSpikedShoulderArmor />:{" "}
                <GiChestArmor />: <GiWinterGloves />: <PiPantsFill />:
              </p>
              <p>
                Zenith : <GiCenturionHelmet />: <GiSpikedShoulderArmor />:{" "}
                <GiChestArmor />: <GiWinterGloves />: <PiPantsFill />:{" "}
              </p>
              <p>
                Dreadful : <GiCenturionHelmet />: <GiSpikedShoulderArmor />:{" "}
                <GiChestArmor />: <GiWinterGloves />: <PiPantsFill />:{" "}
              </p>
              <p>
                Venerated : <GiCenturionHelmet />: <GiSpikedShoulderArmor />:{" "}
                <GiChestArmor />: <GiWinterGloves />: <PiPantsFill />:
              </p>
            </div>
          </div>

          <div className={styles.raidbtncontainer}>
            <button
              onClick={(e) => setDifficultyToken("NORMAL")}
              className={styles.normalbutton}
            >
              Normal
            </button>
            <button
              onClick={(e) => setDifficultyToken("HEROIC")}
              className={styles.heroicbutton}
            >
              Heroic
            </button>
            <button
              onClick={(e) => setDifficultyToken("MYTHIC")}
              className={styles.mythicbutton}
            >
              Mythique
            </button>
          </div>
          <span className={styles.chosendifficulty}>
            Difficulté selectionné : {difficultyToken}
          </span>
          <div className={styles.raidtokencontainer}>
            <div className={styles.raiddata}>
              <div className={styles.tokencount}>
                {Object.keys(tokenPartMaxRaidOne).map((token) => (
                  <div key={token} className={styles[token]}>
                    <div className={styles.token}></div>
                    <h3>
                      {/*@ts-ignore*/}
                      {token} ({tokenCountsOne[token]})
                    </h3>
                    {Object.entries(
                      (() => {
                        if (difficultyToken === "NORMAL") {
                          return getMissingPartsForToken(
                            token,
                            tokenPartMaxRaidOne,
                            tokenPartCountsRaidOneNormal
                          );
                        } else if (difficultyToken === "HEROIC") {
                          return getMissingPartsForToken(
                            token,
                            tokenPartMaxRaidOne,
                            tokenPartCountsRaidOneHeroic
                          );
                        } else if (difficultyToken === "MYTHIC") {
                          return getMissingPartsForToken(
                            token,
                            tokenPartMaxRaidOne,
                            tokenPartCountsRaidOneMythic
                          );
                        } else {
                          return getMissingPartsForToken(
                            token,
                            tokenPartMaxRaidOne,
                            tokenPartCountsRaidOne
                          );
                        }
                      })()
                    ).map(([part, missing]) => (
                      <p key={part} className={styles.missingtokendata}>
                        {toggleIcons === "ICON" ? (
                          <>
                            {/*@ts-ignore*/}
                            {partIcons[part]} {missing}
                          </>
                        ) : (
                          <>
                            {part} {missing}
                          </>
                        )}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Display missing buffs */}
            </div>

            <div className={styles.raiddata}>
              <div className={styles.tokencount}>
                {Object.keys(tokenPartMaxRaidTwo).map((token) => (
                  <div key={token} className={styles[token]}>
                    <h3>
                      {/*@ts-ignore*/}
                      {token} ({tokenCountsTwo[token]})
                    </h3>
                    {Object.entries(
                      (() => {
                        if (difficultyToken === "NORMAL") {
                          return getMissingPartsForToken(
                            token,
                            tokenPartMaxRaidTwo,
                            tokenPartCountsRaidTwoNormal
                          );
                        } else if (difficultyToken === "HEROIC") {
                          return getMissingPartsForToken(
                            token,
                            tokenPartMaxRaidTwo,
                            tokenPartCountsRaidTwoHeroic
                          );
                        } else if (difficultyToken === "MYTHIC") {
                          return getMissingPartsForToken(
                            token,
                            tokenPartMaxRaidTwo,
                            tokenPartCountsRaidTwoMythic
                          );
                        } else {
                          return getMissingPartsForToken(
                            token,
                            tokenPartMaxRaidTwo,
                            tokenPartCountsRaidTwo
                          );
                        }
                      })()
                    ).map(([part, missing]) => (
                      <p key={part} className={styles.missingtokendata}>
                        {toggleIcons === "ICON" ? (
                          <>
                            {/*@ts-ignore*/}
                            {partIcons[part]} {missing}
                          </>
                        ) : (
                          <>
                            {part} {missing}
                          </>
                        )}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Raids;
