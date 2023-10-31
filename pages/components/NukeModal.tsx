import styles from "./NukeModal.module.css";
import { validateClearModal, closeClearModal } from "../../utils/modals";
import { clearRaid } from "../../utils/managePlayer";

function nukeModal({ setClearModal }: any) {
  return (
    <div className={styles.clearmodalcontainer}>
      <h2 className={styles.clearmaintitle}> Clear raid </h2>
      <div className={styles.cleartitle}>
        {" "}
        Clear raids ? cette action est irrévocable comme la sentence{" "}
      </div>
      <div className={styles.btncontainer}>
        <button
          className={styles.btnclearno}
          onClick={(e) => closeClearModal(setClearModal)}
        >
          No
        </button>
        <button
          className={styles.btnclearyes}
          onClick={(e) => validateClearModal(setClearModal, clearRaid)}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default nukeModal;
