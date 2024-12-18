import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../utils/context";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [misparIshi, setmisparIshi] = useState("");
  const { userDisplayName, updateUserDisplayName } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");


  const isInputValid = () => {
    setErrorMessage("");
    const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?!(.*\d){4})[a-zA-Z0-9]+$/;
    const misparIshiRegex = /^\d+$/;
    let isInputValid = true;
    if (!usernameRegex.test(username)) {
      setErrorMessage(
        "שם משתמש לא תקין, צריך להכיל אות גדולה וקטנה, ועד 3 מספרים. "
      );
      isInputValid = false;
    }
    if (!misparIshiRegex.test(misparIshi)) {
      setErrorMessage((prev) => prev + "מספר אישי צריך להכיל מספרים בלבד");
      isInputValid = false;
    }
    return isInputValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isInputValid()) {
      const res = await axios.post(
        "http://localhost:3001/login",
        { username, misparIshi },
        {
          headers: {
            user_name: username,
            user_mispar_ishi: misparIshi,
          },
        }
      );
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify({username:res.data.User_Name,misparIshi:res.data.Mispar_Ishi}));
        updateUserDisplayName(`${res.data.First_Name} ${res.data.Last_Name}`);
        navigate("/home");
      } else {
        setErrorMessage("שגיאה בהתחברות");
      }
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>
            שם משתמש
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="misparIshi" className={styles.label}>
            מספר אישי
          </label>
          <input
            type="password"
            id="misparIshi"
            value={misparIshi}
            onChange={(e) => setmisparIshi(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <button type="submit" className={styles.button}>
          התחברות
        </button>
      </form>
    </div>
  );
};

export default Login;
