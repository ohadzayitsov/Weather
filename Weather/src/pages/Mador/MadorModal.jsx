import styles from "./MadorModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Clock from "../../components/Clock/Clock";
import { useState } from "react";
const MadorModal = ({ setIsOpen }) => {
  const [soldierName, setSoldierName] = useState("");
  const [misparIshi, setMisparIshi] = useState("");
  const [username, setUsername] = useState("");
  const [soldierSex, setSoldierSex] = useState("");

  const isInputValid = () => {
    return Boolean(soldierName && misparIshi && username && soldierSex);
  };
  return (
    <div className={styles.body}>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <FontAwesomeIcon
              className={styles.xIcon}
              icon={faX}
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </div>
          <hr className={styles.hr} />
          <div className={styles.madorSoldiers}>
            <div></div>
            <div className={styles.madorTitle}>
              <div className={styles.title}>חיילי המדור</div>
              <div>
                <Clock />
              </div>
            </div>
          </div>
          <hr className={styles.hr} />
          <div className={styles.inputContainer}>
            <input
              onChange={(e) => setSoldierName(e.target.value)}
              value={soldierName}
              type="text"
              className={styles.input}
              placeholder="שם החייל"
            />
            <input
              onChange={(e) => setMisparIshi(e.target.value)}
              value={misparIshi}
              type="text"
              className={styles.input}
              placeholder="מספר אישי"
            />
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              className={styles.input}
              placeholder="שם משתמש"
            />
            <input
              onChange={(e) => setSoldierSex(e.target.value)}
              value={soldierSex}
              type="text"
              className={styles.sexInput}
              placeholder="מין"
            />
          </div>
          
          <button className={isInputValid() ? styles.addBtn : styles.addBtnDisabled} >הוספה</button>
         <div className={styles.soldierContainer}>
                <p>סדר לפי</p>
         </div>
        </div>
      </div>
    </div>
  );
};

export default MadorModal;
