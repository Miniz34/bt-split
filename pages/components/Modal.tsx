import React, { useState, ChangeEvent } from "react";
import { createPlayer, updatePlayer } from "../../utils/managePlayer";

interface PlayerData {
  name: string;
  class: string;
  alt: string;
  altClass: string;
  role: string;
  altRole: string;
}

interface PlayerModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: (data: PlayerData) => void;
}

const Modal: React.FC<PlayerModalProps> = ({
  show,
  handleClose,
  handleSave,
}) => {
  const [playerData, setPlayerData] = useState<PlayerData>({
    name: "",
    class: "",
    alt: "",
    altClass: "",
    role: "",
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
    } else {
      setPlayerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  const handleSaveClick = () => {
    // Pass the playerData to the parent component for saving
    handleSave(playerData);
    handleClose(); // Close the modal
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Player</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={playerData.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Class</label>
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
              </div>
              <div className="form-group">
                <label>Role</label>
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
              </div>
              <div className="form-group">
                <label>Alt</label>
                <input
                  type="text"
                  name="alt"
                  value={playerData.alt}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Class</label>
                <select
                  name="altClass"
                  value={playerData.class}
                  onChange={handleChange}
                  className="form-control"
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
              </div>
              <div className="form-group">
                <label>Alt Role</label>
                <select
                  name="altRole"
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
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
