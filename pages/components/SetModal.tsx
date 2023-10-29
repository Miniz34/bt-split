import styles from "./SetModal.module.css";
import { updateSet } from "../../utils/managePlayer";

function SetModal({ onValueClick, player, item, handleCloseModal }: any) {
  const handleClickModal = (value: any) => {
    const currentDate = new Date();
    const isoDate = currentDate.toISOString();
    onValueClick(value);
    console.log(player, item, value, onValueClick); // Include the 'value' in the console.log for verification
    updateSet(player._id, item, value, isoDate), handleCloseModal();
    // Pass 'value' to the updateSet function
  };

  const handleClose = () => {
    handleCloseModal(); // Call the parent's handleCloseModal function
  };

  return (
    <div className={styles.setmodal} id="modal">
      <div>
        <p onClick={() => handleClickModal("NULL")}>NULL</p>
        <p onClick={() => handleClickModal("NORMAL")}>NORMAL</p>
        <p onClick={() => handleClickModal("HEROIC")}>HEROIC</p>
        <p onClick={() => handleClickModal("MYTHIC")}>MYTHIC</p>
      </div>
      <button onClick={handleClose}>close</button>
    </div>
  );
}

export default SetModal;
