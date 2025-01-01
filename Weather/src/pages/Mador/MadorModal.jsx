import styles from "./MadorModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faX } from "@fortawesome/free-solid-svg-icons";
import Clock from "../../components/Clock/Clock";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../utils/context";
import SoldiersList from "../../components/SoldiersList/SoldiersList";
import { Arrows } from "../../utils/icons/icons";
import clsx from "clsx";

const MadorModal = ({ setIsOpen, soldiers, setSoldiers }) => {
  const { misparIshi, updateMisparIshi } = useContext(UserContext);
  const { username, updateUsername } = useContext(UserContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [misparIshiInput, setMisparIshiInput] = useState("");
  const [soldierName, setSoldierName] = useState("");
  const [soldiergender, setSoldiergender] = useState("");
  const [isOptions, setIsOptions] = useState(false);
  const [tempSoldiers, setTempSoldiers] = useState([]);
  const [currOption, setCurrOption] = useState("עיר");
  const [selectedSoldiers, setSelectedSoldiers] = useState([]);
  const options = ["עיר", "מיקום עיר בארץ", "מין", "תפקיד + דרגה"];

  useEffect(() => {
    setTempSoldiers(soldiers);
  }, [soldiers]);

  const toggleOptions = () => {
    setIsOptions((prev) => !prev);
  };

  const isInputValid = () => {
    const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?!(.*\d){4})[a-zA-Z0-9]+$/;
    const misparIshiRegex = /^\d+$/;

    return (
      misparIshiRegex.test(misparIshiInput) &&
      usernameRegex.test(usernameInput) &&
      Boolean(soldierName && misparIshiInput && usernameInput && soldiergender)
    );
  };

  const saveSoldiers = async () => {
    try {
      await axios.put(
        "http://localhost:3001/updateMadorSoldiers",
        {
          newSoldiers: tempSoldiers,
        },
        {
          headers: {
            user_name: username,
            user_mispar_ishi: misparIshi,
          },
        }
      );
      setSoldiers(tempSoldiers);
    } catch (error) {
      alert("Error adding soldiers: " + error.message);
    }
  };

  const addSoldier = () => {
    if (isInputValid()) {
      const soldierNames = soldierName.split(" ");
      const newSoldier = {
        Mispar_Ishi: misparIshiInput,
        User_Name: usernameInput,
        First_Name: soldierNames[0] || "",
        Last_Name: soldierNames[1] || "",
        Gender: soldiergender,
        Role: "מפתח תוכנה",
        Rank: 'רב"ט',
        City: "כפר מנחם",
        City_Location: "מרכז",
        Is_Officer: false,
        Age: 19,
      };
      setTempSoldiers((prev) => [...prev, newSoldier]);
      setUsernameInput("");
      setMisparIshiInput("");
      setSoldiergender("");
      setSoldierName("");
    } else {
      alert("Invalid soldier details");
    }
  };

  const groupSoldiers = (option) => {
    switch (option) {
      case "עיר":
        return tempSoldiers.reduce((soldiersArr, soldier) => {
          soldiersArr[soldier.City] = soldiersArr[soldier.City] || [];
          soldiersArr[soldier.City].push(soldier);
          return soldiersArr;
        }, {});
      case "מיקום עיר בארץ":
        return tempSoldiers.reduce((soldiersArr, soldier) => {
          soldiersArr[soldier.City_Location] =
            soldiersArr[soldier.City_Location] || [];
          soldiersArr[soldier.City_Location].push(soldier);
          return soldiersArr;
        }, {});
      case "מין":
        return tempSoldiers.reduce((soldiersArr, soldier) => {
          const genderKey = soldier.Gender === "ז" ? "זכר" : "נקבה";
          soldiersArr[genderKey] = soldiersArr[genderKey] || [];
          soldiersArr[genderKey].push(soldier);
          return soldiersArr;
        }, {});
      case "תפקיד + דרגה":
        return tempSoldiers.reduce((soldiersArr, soldier) => {
          const key = `${soldier.Role}, ${soldier.Rank}`;
          soldiersArr[key] = soldiersArr[key] || [];
          soldiersArr[key].push(soldier);
          return soldiersArr;
        }, {});
      default:
        return {};
    }
  };

  const groupedSoldiers = groupSoldiers(currOption);

  const unselectAllSoldiers = () => {
    setSelectedSoldiers([]);
  };
  const deleteSelectedSoldiers = () => {
    setTempSoldiers(
      tempSoldiers.filter(
        (soldier) =>
          !selectedSoldiers.some(
            (selected) => selected.Mispar_Ishi === soldier.Mispar_Ishi
          )
      )
    );
    setSelectedSoldiers([]);
  };
  const selectAllSoldiers = () => {
    setSelectedSoldiers((prev) => [...prev, ...tempSoldiers]);
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
              onClick={() => setIsOpen(false)}
            />
          </div>
          <hr className={styles.hr} />

          <div className={styles.madorTitle}>
            <div>
              <div className={styles.title}>חיילי המדור</div>
              <div>
                <Clock />
              </div>
            </div>
            <div className={styles.arrowsContainer}>{Arrows()}</div>
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
              onChange={(e) => setMisparIshiInput(e.target.value)}
              value={misparIshiInput}
              type="text"
              className={styles.input}
              placeholder="מספר אישי"
            />
            <input
              onChange={(e) => setUsernameInput(e.target.value)}
              value={usernameInput}
              type="text"
              className={styles.input}
              placeholder="שם משתמש"
            />
            <div className={styles.genderInput}>
              <div className={styles.genderTitle}>מין</div>
              <label>
                <input
                  className={styles.radio}
                  type="radio"
                  checked={soldiergender === "ז"}
                  onChange={() => setSoldiergender("ז")}
                />
                זכר
              </label>
              <label>
                <input
                  className={styles.radio}
                  type="radio"
                  checked={soldiergender === "נ"}
                  onChange={() => setSoldiergender("נ")}
                />
                נקבה
              </label>
            </div>
          </div>
          <button
            className={isInputValid() ? styles.addBtn : styles.addBtnDisabled}
            disabled={!isInputValid()}
            onClick={addSoldier}
          >
            הוספה
          </button>

          <div className={styles.orderContainer}>
            <div className={styles.orderBy} onClick={toggleOptions}>
              <span
                style={{
                  fontWeight: isOptions ? "bold" : "normal",
                }}
              >
                סדר לפי: {currOption}
              </span>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
            {isOptions && (
              <div className={styles.options}>
                {options.map((option) => (
                  <div
                    key={option}
                    className={clsx(
                      styles.option,
                      currOption === option ? styles.selectedOption : ""
                    )}
                    onClick={() => {
                      setCurrOption(option);
                      setIsOptions(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          <hr className={styles.hr} />
          <div className={styles.soldiersContainer}>
            {Object.entries(groupedSoldiers).map(([group, groupSoldiers]) => (
              <SoldiersList
                key={group}
                title={group}
                soldiers={groupSoldiers}
                selectedSoldiers={selectedSoldiers}
                setSelectedSoldiers={setSelectedSoldiers}
              />
            ))}
          </div>
          <hr className={styles.hr} style={{ marginBottom: "25px" }} />
          <div className={styles.btnsContainer}>
            <button
              className={
                tempSoldiers.length > 0
                  ? styles.addBtn
                  : styles.addBtnDisabled
              }
              disabled={tempSoldiers.length === 0}
              onClick={saveSoldiers}
            >
              שמירה
            </button>
            <button className={styles.btn} onClick={selectAllSoldiers}>
              בחר הכל
            </button>
            <button className={styles.btn} onClick={unselectAllSoldiers}>
              נקה הכל
            </button>
            <button
              className={clsx(
                selectedSoldiers.length > 0
                  ? `${styles.deleteBtn} ${styles.btn}`
                  : styles.btnDisabled
              )}
              onClick={deleteSelectedSoldiers}
            >
              מחיקת מסומנים
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MadorModal;
