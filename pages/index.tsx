import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { createPlayer, updatePlayer } from "../utils/managePlayer";
import Modal from "./components/Modal";
import PlayerCard from "./components/PlayerCard";
import App from "./app";
import Raids from "./components/Raids";
import styles from "./index.module.css";
import { setRaidOne } from "../utils//managePlayer"; // Replace with your API client
import { updateSet, clearRaid } from "../utils/managePlayer";

type ConnectionStatus = {
  isConnected: boolean;
};

interface Player {
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

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [lastModified, setLastModified] = useState(""); // Initialize with an empty string
  const [sortedData, setSortedData] = useState<Player[]>([]); // To store the current sorted data
  const [sortByToken, setSortByToken] = useState(false); // To indicate whether to sort by token

  // const [displayModal, setDisplayModal] = useState(false);

  async function updateRaidForPlayer(
    playerId: any,
    raidOneValue: number,
    raidTwoValue: number
  ) {
    try {
      const response = await setRaidOne(playerId, raidOneValue, raidTwoValue);
      if (response.ok) {
        console.log("Raid updated successfully");
        // Update the state of the player whose raid was changed
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) => {
            if (player._id === playerId) {
              // Update the player's raid
              return {
                ...player,
                main: { ...player.main, raid: raidOneValue },
                alt: { ...player.alt, raid: raidTwoValue },
              };
            }
            return player;
          })
        );
      } else {
        console.error("Failed to update raid");
      }
    } catch (error) {
      console.error("Error updating raid:", error);
    }
  }

  useEffect(() => {
    (async () => {
      const results = await fetch("/api/list").then((response) =>
        response.json()
      );

      let newUserId = 1;
      const lastUser = results[results.length - 1]; // Assuming results is an array
      if (lastUser) {
        newUserId = lastUser.playerId + 1;
      }

      setPlayers(results);

      if (results.lastModified !== lastModified) {
        setPlayers(results);
        setLastModified(results.lastModified);
      }
    })();
  }, []);

  const [newBeuteu, setNewBeuteu] = useState("");
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();

  const toggleSortPlayers = () => {
    setSortByToken((prevSortByToken) => !prevSortByToken);
    setSortedData((prevSortedData) => {
      if (sortByToken) {
        // Sort by token
        return sortedPlayersByToken;
      } else {
        // Sort by role (default)
        return sortedPlayers;
      }
    });
  };

  //TODO handle any
  const handleSavePlayer = (playerData: any) => {
    // Handle saving player data (e.g., send it to your API)
    createPlayer(playerData); // Call the createPlayer function with the player data
  };

  const sortedPlayers = [...players].sort((a, b) => {
    const roleOrder: { [key: string]: number } = {
      TANK: 1,
      HEALER: 2,
      RANGED_DPS: 3,
      MELEE_DPS: 4,
    };
    return roleOrder[a.main.role] - roleOrder[b.main.role];
  });

  const groupedPlayers: Record<string, Player[]> = {};
  sortedPlayers.forEach((player) => {
    const { role } = player.main;
    if (!groupedPlayers[role]) {
      groupedPlayers[role] = [];
    }
    groupedPlayers[role].push(player);
  });

  const sortedPlayersByToken = [...players].sort((a, b) => {
    const tokenOrder: { [key: string]: number } = {
      Mystic: 1,
      Zenith: 2,
      Dreadful: 3,
      Venerated: 4,
    };
    return tokenOrder[a.main.token] - tokenOrder[b.main.token];
  });

  const groupedPlayersToken: Record<string, Player[]> = {};
  sortedPlayersByToken.forEach((player) => {
    const { token } = player.main;
    if (!groupedPlayersToken[token]) {
      groupedPlayersToken[token] = [];
    }
    groupedPlayersToken[token].push(player);
  });

  const [displayModal, setDisplayModal] = useState(false);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const showModal = (player: any, item: any) => {
    setSelectedPlayer(player);
    setSelectedItem(item);
    setDisplayModal(true);
    console.log("modal opened");
  };

  const handleValueClick = (value: any) => {
    // Handle the clicked value here, for example, log it
    console.log("Clicked value: ", value);
  };

  const handleCloseModal = () => {
    setDisplayModal(false);
  };

  const handleClickModal = async (value: any) => {
    const currentDate = new Date();
    const isoDate = currentDate.toISOString();

    console.log(selectedItem);
    console.log(selectedPlayer);

    // Create an updated set object based on the selected item and value
    const updatedSet = {
      // @ts-ignore
      ...selectedPlayer.set,
      // @ts-ignore

      [selectedItem]: value, // Use the selectedItem as a dynamic key
    };

    // Update the player's data
    const updatedPlayer = {
      // @ts-ignore

      ...selectedPlayer,
      set: updatedSet,
    };

    // Update the state with the updated player
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        // @ts-ignore
        if (player._id === selectedPlayer._id) {
          return updatedPlayer;
        }
        return player;
      });
    });

    try {
      // Call the function to update your data on the server
      // @ts-ignore
      await updateSet(selectedPlayer._id, selectedItem, value, isoDate);

      // Close the modal after the state update
      handleCloseModal();
    } catch (error) {
      console.error("Error updating set:", error);

      // Handle the error here, for example, show an error message
    }
  };

  console.log(selectedItem);
  console.log(selectedPlayer);
  return (
    <>
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div className={styles.indexhead}>
            <h1 className={styles.maintitle}>Splits Bloody Teraz</h1>
            <div className={styles.buttonlist}>
              <button
                onClick={toggleSortPlayers}
                className={styles.buttonheader}
              >
                Sort by {sortByToken ? "Role" : "Token"}
              </button>
              <button className={styles.buttonheader} onClick={clearRaid}>
                Nuke
              </button>
            </div>
          </div>

          <div className="cards-container">
            {Object.entries(
              sortByToken ? groupedPlayersToken : groupedPlayers
            ).map(([role, players]) => (
              <div key={role} className="role-section">
                <div className="player-cards">
                  <PlayerCard
                    key={role}
                    players={players}
                    displayModal={displayModal}
                    setDisplayModal={setDisplayModal}
                    updateRaidForPlayer={updateRaidForPlayer}
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    handleClickModal={handleClickModal}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* <PlayerCard players={players} /> */}

          <button
            onClick={(e) => {
              createPlayer;
            }}
          >
            create player
          </button>

          <Modal
            // @ts-ignore
            show={showModal}
            // @ts-ignore
            handleClose={showModal}
            handleSave={handleSavePlayer}
          />

          <div>
            <input
              type="text"
              value={newBeuteu}
              onChange={(e) => setNewBeuteu(e.target.value)}
            />
            <button
              onClick={(e) => {
                updatePlayer(newBeuteu, isoDate);
              }}
            >
              Update Beuteu
            </button>
          </div>
        </main>
        <Raids compo={players} />

        <div></div>

        <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 75%;
          }

          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          footer img {
            margin-left: 0.5rem;
          }

          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .title a {
            color: #0070f3;
            text-decoration: none;
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }

          .title,
          .description {
            text-align: center;
          }

          .subtitle {
            font-size: 2rem;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }

          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }

          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;

            max-width: 800px;
            margin-top: 3rem;
          }

          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }

          .logo {
            height: 1em;
          }

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style>
        {/* background-color: #121212; */}

        <style jsx global>{`
          html,
          body {
            background-color: #121212;
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </>
  );
}
