import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureFull,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/context";

const Navbar = () => {
  const { userDisplayName, updateUserDisplayName } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("user");
    updateUserDisplayName(null);
    navigate("/login");
  };

  return (
    <div className={styles.navBody}>
      <div className={styles.navTitle}>
        {" "}
        <FontAwesomeIcon icon={faTemperatureFull} />
        Weather
      </div>
      {userDisplayName ? (
        <div className={styles.loggedIn}>
          <p className={styles.username}>{"שלום, " + userDisplayName} </p>{" "}
          <div className={styles.logOut} onClick={handleLogOut}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
        </div>
      ) : (
        <p> </p>
      )}
    </div>
  );
};

export default Navbar;
