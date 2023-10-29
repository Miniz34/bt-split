import styles from "./Raids.module.css";

function Raids({ compo }: any) {
  console.log("compo ici", compo);
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

  return (
    <>
      <div className={styles.raidscontainer}>
        <div>
          <h2>raid 1</h2>
          {raidOne.map((player: any) => (
            <p key={player._id}>{player.name}</p>
          ))}
        </div>
        <div>
          <h2>raid 1</h2>
          {raidTwo.map((player: any) => (
            <p key={player._id}>{player.name}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default Raids;
