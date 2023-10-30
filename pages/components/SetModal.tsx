import styles from "./SetModal.module.css";
import { updateSet } from "../../utils/managePlayer";
import { getClassColor } from "../../utils/colors";

function SetModal({
  handleCloseModal,
  handleClickModal,
  selectedValue,
  selectedItem,
  selectedPlayer,
}: any) {
  // const handleClickModal = (value: any) => {
  //   const currentDate = new Date();
  //   const isoDate = currentDate.toISOString();
  //   onValueClick(value);
  //   console.log(player, item, value, onValueClick); // Include the 'value' in the console.log for verification
  //   updateSet(player._id, item, value, isoDate), handleCloseModal();
  //   // Pass 'value' to the updateSet function
  // };

  console.log("value here", selectedValue);
  async function updateSetForPlayer() {}

  const handleClose = () => {
    handleCloseModal(); // Call the parent's handleCloseModal function
  };

  return (
    <div className={styles.setmodal} id="modal">
      <div className={styles.modalHeader}>
        <div className={styles.textcontainer}>
          {selectedPlayer ? (
            <h1
              className={`${getClassColor(selectedPlayer.main.class)} ${
                styles.titlemodal
              }`}
            >
              {selectedPlayer.main.name}
            </h1>
          ) : null}{" "}
          {selectedItem ? (
            <h2 className={`${styles.titlepartmodal}`}>
              {selectedItem.charAt(0).toUpperCase() + selectedItem.slice(1)}
            </h2>
          ) : null}
        </div>
        <div className={styles.closecontainer}>
          <button className={styles.closeButton} onClick={handleClose}>
            &times;
          </button>
        </div>
      </div>
      <div className={styles.modalContent}>
        <p
          onClick={() => handleClickModal("NULL")}
          className={`${
            selectedValue === "NULL" || selectedValue === null
              ? styles.selected
              : ""
          } ${styles.modalselect}`}
        >
          NULL
        </p>
        <p
          onClick={() => handleClickModal("NORMAL")}
          className={`${selectedValue === "NORMAL" ? styles.selected : ""} ${
            styles.modalselect
          }`}
        >
          NORMAL
        </p>
        <p
          onClick={() => handleClickModal("HEROIC")}
          className={`${selectedValue === "HEROIC" ? styles.selected : ""} ${
            styles.modalselect
          }`}
        >
          HEROIC
        </p>
        <p
          onClick={() => handleClickModal("MYTHIC")}
          className={`${selectedValue === "MYTHIC" ? styles.selected : ""} ${
            styles.modalselect
          }`}
        >
          MYTHIC
        </p>
      </div>
    </div>
  );
}

export default SetModal;
