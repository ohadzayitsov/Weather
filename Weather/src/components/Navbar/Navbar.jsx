import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureFull,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SearchContext, UserContext } from "../../utils/context";

const Navbar = () => {
  const { userDisplayName, updateUserDisplayName } = useContext(UserContext);
  const { lastSearches, updateLastSearches } = useContext(SearchContext);
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
        <div className={styles.navigation}>
          <Link to="/home" className={styles.link}>
            ראשי
          </Link>
          <Link
            to={lastSearches.length > 0 ? "/history" : "#"}
            className={styles.link}
          >
            היסטוריה - {lastSearches.length}{" "}
          </Link>
          <Link to="/mador" className={styles.link}>
            מדור
          </Link>
        </div>
      ) : null}

      {userDisplayName ? (
        <div className={styles.loggedIn}>
          <p className={styles.username}>{"שלום, " + userDisplayName} </p>{" "}
          <div className={styles.logOut} onClick={handleLogOut}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
