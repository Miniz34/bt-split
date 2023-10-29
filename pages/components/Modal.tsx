import React, { useState } from "react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlayerData({
      ...playerData,
      [name]: value,
    });
  };

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
                <input
                  type="text"
                  name="class"
                  value={playerData.class}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  value={playerData.role}
                  onChange={handleChange}
                  className="form-control"
                />
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
                <label>alt Class</label>
                <input
                  type="text"
                  name="altClass"
                  value={playerData.altClass}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>alt Role</label>
                <input
                  type="text"
                  name="altRole"
                  value={playerData.altRole}
                  onChange={handleChange}
                  className="form-control"
                />
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
