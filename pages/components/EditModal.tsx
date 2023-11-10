import React, { useState, ChangeEvent } from "react";
import { createPlayer, editPlayer } from "../../utils/managePlayer";
import styles from "./Modal.module.css";
import {
  openInputModal,
  closeInputModal,
  handleSavePlayer,
  handleEditPlayer,
  closeEditModal,
} from "../../utils/modals";

interface PlayerData {
  _id: string;
  name: string;
  class: string;
  alt: string;
  altClass: string;
  role: string;
  altRole: string;
}

const EditModal = ({ setEditModal, player }: any) => {
  const [playerData, setPlayerData] = useState<PlayerData>({
    _id: player._id,
    name: player.main.name,
    class: player.main.class,
    alt: player.alt.name,
    altClass: player.alt.class,
    role: player.main.role,
    altRole: player.alt.role,
  });

  const [errors, setErrors] = useState({
    name: "",
    class: "",
    role: "",
    alt: "",
    altClass: "",
    altRole: "",
  });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setPlayerData({
  //     ...playerData,
  //     [name]: value,
  //   });
  // };

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      // Use type assertion to access the 'checked' property
      const isChecked = (e.target as HTMLInputElement).checked;
      setPlayerData((prevData) => ({
        ...prevData,
        [name]: isChecked,
      }));
      if (
        name === "name" ||
        name === "class" ||
        name === "role" ||
        name === "alt" ||
        name === "altClass" ||
        name === "altRole"
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: value ? "" : "This field is required",
        }));
      }
    } else {
      setPlayerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  function isFormValid() {
    const { name, class: className, role } = playerData;

    const nameError = !name ? "Name is required" : "";
    const classError = !className ? "Class is required" : "";
    const roleError = !role ? "Role is required" : "";
    const altError = !role ? "Alt is required" : "";
    const altClassError = !role ? "Alt class is required" : "";
    const altRoleError = !role ? "Alt Role is required" : "";

    setErrors({
      name: nameError,
      class: classError,
      role: roleError,
      alt: altError,
      altClass: altClassError,
      altRole: altRoleError,
    });

    return (
      !nameError &&
      !classError &&
      !roleError &&
      !altError &&
      !altClassError &&
      !altRoleError
    );
  }

  console.log("players in modal here:", player);

  // const handleSaveClick = () => {
  //   // Pass the playerData to the parent component for saving
  //   handleSave(playerData);
  //   handleClose(); // Close the modal
  // };

  return (
    <div className={styles.inputmodalcontainer}>
      <div className={styles.modaldialog}>
        <div className={styles.modalcontent}>
          <div className={styles.inputmodalheader}>
            <h5 className={styles.inputmodaltitle}>Edit {player.main.name}</h5>
            <button
              type="button"
              className={styles.inputmodalbutton}
              onClick={(e) => closeInputModal(setEditModal)}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className={styles.inputmodalbody}>
            <form>
              <div className={styles.formgroup}>
                <label className={styles.labelmodal}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={playerData.name}
                  onChange={handleChange}
                  className={styles.formmodal}
                />
                <span className={styles.error}>{errors.name}</span>
              </div>
              <div className={styles.formgroup}>
                <label className={styles.labelmodal}>Class</label>
                <select
                  name="class"
                  value={playerData.class}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select Class</option>{" "}
                  <option value="Priest">Priest</option>
                  <option value="Mage">Mage</option>
                  <option value="Paladin">Paladin</option>
                  <option value="Hunter">Hunter</option>
                  <option value="Shaman">Shaman</option>
                  <option value="Warrior">Warrior</option>
                  <option value="Evoker">Evoker</option>
                  <option value="Monk">Monk</option>
                  <option value="Warlock">Warlock</option>
                  <option value="Druid">Druid</option>
                  <option value="DH">DH</option>
                  <option value="DK">DK</option>
                  <option value="Rogue">Rogue</option>
                </select>
                <span className={styles.error}>{errors.class}</span>
              </div>
              <div className={styles.formgroup}>
                <label className={styles.labelmodal}>Role</label>
                <select
                  name="role"
                  value={playerData.role}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select Role</option>{" "}
                  {/* Empty placeholder */}
                  <option value="TANK">TANK</option>
                  <option value="HEALER">HEALER</option>
                  <option value="RANGED_DPS">RANGED DPS</option>
                  <option value="MELEE_DPS">MELEE DPS</option>
                </select>
                <span className={styles.error}>{errors.role}</span>
              </div>
              <div className={styles.formgroup}>
                <label className={styles.labelmodal}>Alt</label>
                <input
                  type="text"
                  name="alt"
                  value={playerData.alt}
                  onChange={handleChange}
                  className={styles.formmodal}
                />
                <span className={styles.error}>{errors.alt}</span>
              </div>
              <div className={styles.formgroup}>
                <label className={styles.labelmodal}>Class</label>
                <select
                  name="altClass"
                  value={playerData.altClass}
                  onChange={handleChange}
                  className={styles.formmodal}
                >
                  <option value="">Select Class</option>{" "}
                  {/* Empty placeholder */}
                  <option value="Priest">Priest</option>
                  <option value="Mage">Mage</option>
                  <option value="Paladin">Paladin</option>
                  <option value="Hunter">Hunter</option>
                  <option value="Shaman">Shaman</option>
                  <option value="Warrior">Warrior</option>
                  <option value="Evoker">Evoker</option>
                  <option value="Monk">Monk</option>
                  <option value="Warlock">Warlock</option>
                  <option value="Druid">Druid</option>
                  <option value="DH">DH</option>
                  <option value="DK">DK</option>
                  <option value="Rogue">Rogue</option>
                </select>
                <span className={styles.error}>{errors.altClass}</span>
              </div>
              <div className={styles.formgroup}>
                <label className={styles.labelmodal}>Alt Role</label>
                <select
                  name="altRole"
                  value={playerData.altRole}
                  onChange={handleChange}
                  className={styles.formmodal}
                >
                  <option value="">Select Role</option>{" "}
                  {/* Empty placeholder */}
                  <option value="TANK">TANK</option>
                  <option value="HEALER">HEALER</option>
                  <option value="RANGED_DPS">RANGED DPS</option>
                  <option value="MELEE_DPS">MELEE DPS</option>
                </select>
                <span className={styles.error}>{errors.altRole}</span>
              </div>
            </form>
          </div>
          <div className={styles.modalbntlist}>
            <button
              type="button"
              className={styles.inputclosemodal}
              onClick={(e) => closeInputModal(setEditModal)}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.inputsavemodal}
              onClick={(e) => {
                if (isFormValid()) {
                  handleEditPlayer(playerData, editPlayer, setEditModal);
                }
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
