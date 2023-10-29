import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { createPlayer, updatePlayer } from "../utils/managePlayer";
import Modal from "./components/Modal";
import PlayerCard from "./components/PlayerCard";
import App from "./app";
import Raids from "./components/Raids";

type ConnectionStatus = {
  isConnected: boolean;
};

interface Player {
  _id: string;
  name: string;
  class: string;
  token: string;
  beuteu: string;
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

      console.log("last user here", lastUser);

      if (results.lastModified !== lastModified) {
        setPlayers(results);
        setLastModified(results.lastModified);
      }
    })();
  }, [lastModified]);

  const [newBeuteu, setNewBeuteu] = useState("");
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();

  const [showModal, setShowModal] = useState(true);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(true);
  };

  //TODO handle any
  const handleSavePlayer = (playerData: any) => {
    // Handle saving player data (e.g., send it to your API)
    console.log("Saving player:", playerData);
    createPlayer(playerData); // Call the createPlayer function with the player data
    closeModal();
  };

  console.log(players);

  return (
    <>
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1>RANDOM NOUVEAU TEXT</h1>
          <PlayerCard players={players} />

          <button
            onClick={(e) => {
              createPlayer;
            }}
          >
            create player
          </button>
          {showModal ? (
            <Modal
              show={showModal}
              handleClose={closeModal}
              handleSave={handleSavePlayer}
            />
          ) : null}

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

        <div>
          <button onClick={openModal}>open Modal</button>
        </div>

        <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 75%;
            border: solid red 2px;
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
