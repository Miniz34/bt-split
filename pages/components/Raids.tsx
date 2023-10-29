import styles from "./Raids.module.css";

function Raids({ compo }: any) {
  console.log("compo ici", compo);

  const raidUn = compo
    ? compo.filter((e: any) => {
        if (e.raid === 1) return e;
      })
    : [];

  const test = raidUn.map((e: any) => e.name);
  console.log(test);

  console.log(raidUn);
  return (
    <>
      <div className={styles.raidscontainer}>
        <div>
          <h2>raid 1</h2>
          {raidUn.map((player: any) => (
            <p key={player._id}>{player.name}</p>
          ))}
        </div>
        <div>
          <h2>raid 2</h2>
        </div>
      </div>
    </>
  );
}

export default Raids;
