import styles from "../pages/components/PlayerCard.module.css";

export const getClassColor = (value: string) => {
  if (value === "Mage") {
    return styles.mage;
  } else if (value === "Priest") {
    return styles.priest;
  } else if (value === "Evoker") {
    return styles.evoker;
  } else if (value === "Paladin") {
    return styles.paladin;
  } else if (value === "Shaman") {
    return styles.shaman;
  } else if (value === "Warrior") {
    return styles.warrior;
  } else if (value === "Monk") {
    return styles.monk;
  } else if (value === "Hunter") {
    return styles.hunter;
  } else if (value === "Warlock") {
    return styles.warlock;
  } else if (value === "Druid") {
    return styles.druid;
  } else if (value === "DH") {
    return styles.dh;
  } else if (value === "DK") {
    return styles.dk;
  } else if (value === "Rogue") {
    return styles.rogue;
  } else {
    return styles.black;
  }
};

export const getBorderColor = (value: string) => {
  if (value === "Mage") {
    return "#69ccf0";
  } else if (value === "Priest") {
    return "#ffffff";
  } else if (value === "Evoker") {
    return "#33937f";
  } else if (value === "Paladin") {
    return "#f58cba";
  } else if (value === "Shaman") {
    return "#0070de";
  } else if (value === "Warrior") {
    return "#c79c6e";
  } else if (value === "Monk") {
    return "#00ff96";
  } else if (value === "Hunter") {
    return "#abd473";
  } else if (value === "Warlock") {
    return "#9482c9";
  } else if (value === "Druid") {
    return "#ff7d0a";
  } else if (value === "DH") {
    return "#a330c9";
  } else if (value === "DK") {
    return "#c41f3b";
  } else if (value === "Rogue") {
    return "#fff569";
  } else {
    return "black";
  }
};
