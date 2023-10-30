import styles from "./PlayerCard.module.css";
import { useState, useEffect } from "react";
import React from "react";
import Select from "react-select";
import { getBorderColor, getClassColor } from "../../utils/colors";
import { setRaidOne } from "../../utils//managePlayer"; // Replace with your API client
import helm from "../../public/helmet-game-svgrepo-com.svg";
import {
  FaBeer,
  FaGamepad,
  FaHeadset,
  FaKeyboard,
  FaStar,
} from "react-icons/fa"; // Import icons you want to use

import {
  GiCenturionHelmet,
  GiSpikedShoulderArmor,
  GiChestArmor,
  GiWinterGloves,
} from "react-icons/gi";
import { PiPantsFill } from "react-icons/pi";

import SetModal from "./SetModal";

function PlayerCard({
  players,
  updateRaidForPlayer,
  showModal,
  displayModal,
  setDisplayModal,
  handleCloseModal,
  handleClickModal,
  selectedValue,
  selectedItem,
  selectedPlayer,
}: any) {
  const getSetItemClassName = (value: string) => {
    if (value === null) {
      return styles.black;
    } else if (value === "NORMAL") {
      return styles.green;
    } else if (value === "HEROIC") {
      return styles.orange;
    } else if (value === "MYTHIC") {
      return styles.red;
    } else {
      return styles.black;
    }
  };

  console.log(players);

  const renderEquipmentIcon = (value: string) => {
    if (value === "head") {
      return <GiCenturionHelmet />;
    } else if (value === "shoulders") {
      return <GiSpikedShoulderArmor />;
    } else if (value === "chest") {
      return <GiChestArmor />;
    } else if (value === "hands") {
      return <GiWinterGloves />;
    } else if (value === "legs") {
      return <PiPantsFill />;
    }
    // You can return another icon (e.g., a default icon) for other values
  };

  // async function updateRaidForPlayer(
  //   playerId: any,
  //   raidOneValue: number,
  //   raidTwoValue: number
  // ) {
  //   try {
  //     const response = await setRaidOne(playerId, raidOneValue, raidTwoValue);
  //     if (response.ok) {
  //       console.log("Raid updated successfully");
  //     } else {
  //       console.error("Failed to update raid");
  //     }
  //   } catch (error) {
  //     console.error("Error updating raid:", error);
  //   }
  // }

  // const [displayModal, setDisplayModal] = useState(false);

  // const showModal = (player: any, item: any) => {
  //   setSelectedPlayer(player);
  //   setSelectedItem(item);
  //   setDisplayModal(true);
  //   console.log("modal opened");
  // };

  // const handleValueClick = (value: any) => {
  //   // Handle the clicked value here, for example, log it
  //   console.log("Clicked value: ", value);
  // };

  // const handleCloseModal = () => {
  //   setDisplayModal(false);
  // };

  function countSetValues(playerData: any) {
    if (playerData && playerData.set) {
      const set = playerData.set;
      let count = 0;

      for (const key in set) {
        const value = set[key];

        if (value !== null && value !== "NULL") {
          count++;
        }
      }

      return count;
    }

    return 0; // Return 0 if playerData or set is not defined
  }

  return (
    <>
      <div className={`${styles.card} ${displayModal ? styles.disable : ""}`}>
        {players && Array.isArray(players) ? (
          players.map((player: any) => (
            <div
              key={player._id}
              className={styles.carddata}
              style={{
                borderTop: "6px solid " + getBorderColor(player.main.class),
              }}
            >
              <div className={styles.textcard}>
                <div className={styles.textcardmain}>
                  <h3
                    className={`${getClassColor(player.main.class)} ${
                      styles.mainchar
                    }`}
                  >
                    {player.main.name}
                  </h3>
                  {/* <p>{player.class}</p> */}
                  <p>
                    {player.main.token} {countSetValues(player)}p
                  </p>
                </div>
                <p
                  className={`${getClassColor(player.alt.class)} ${
                    styles.altchar
                  }`}
                >
                  {player.alt.name}
                </p>
              </div>

              <div>
                <ul className={styles.list}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {Object.keys(player.set).map((setItem, index) => (
                      <li
                        key={setItem}
                        className={`${getSetItemClassName(
                          player.set[setItem]
                        )} ${styles.gear}`}
                        onClick={() =>
                          showModal(player, setItem, player.set[setItem])
                        }
                      >
                        {renderEquipmentIcon(setItem)}
                      </li>
                    ))}
                  </div>
                </ul>
              </div>

              {/* <div>
                <ul className={styles.list}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {Object.keys(player.set).map((setItem, index) =>
                      index < 3 ? (
                        <li
                          key={setItem}
                          className={`${getSetItemClassName(
                            player.set[setItem]
                          )} ${styles.gear}`}
                          onClick={() =>
                            showModal(player, setItem, player.set[setItem])
                          }
                        >
                          {renderEquipmentIcon(setItem)}
                        </li>
                      ) : null
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {Object.keys(player.set).map((setItem, index) =>
                      index >= 3 ? (
                        <li
                          key={setItem}
                          className={`${getSetItemClassName(
                            player.set[setItem]
                          )} ${styles.gear}`}
                          onClick={() =>
                            showModal(player, setItem, player.set[setItem])
                          }
                        >
                          {renderEquipmentIcon(setItem)}
                        </li>
                      ) : null
                    )}
                  </div>
                </ul>
              </div> */}
              <div className={styles.buttons}>
                <button
                  className={`${styles.button} ${
                    player.main.raid === 1 ? styles.selected : ""
                  }`}
                  onClick={(e) => {
                    updateRaidForPlayer(player._id, 1, 2);
                  }}
                >
                  1
                </button>
                <button
                  className={`${styles.button} ${
                    player.main.raid === 2 ? styles.selected : ""
                  }`}
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

      {displayModal ? (
        <SetModal
          handleCloseModal={handleCloseModal}
          handleClickModal={handleClickModal}
          selectedValue={selectedValue}
          selectedItem={selectedItem}
          selectedPlayer={selectedPlayer}
        />
      ) : null}
    </>
  );
}

export default PlayerCard;
