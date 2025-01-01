import { useContext, useEffect, useState } from "react";
import styles from "./Mador.module.css";
import MadorPopUp from "./MadorModal";
import { UserContext } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Mador = () => {
  const { misparIshi, updateMisparIshi } = useContext(UserContext);
  const { username, updateUsername } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const { userDisplayName, updateUserDisplayName } = useContext(UserContext);
  const navigate = useNavigate();
  const [soldiers, setSoldiers] = useState([]);
  useEffect(() => {
    const fetchSoldiers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/getAllSoldiers", {
          headers: {
            user_name: username,
            user_mispar_ishi: misparIshi,
          },
        });

        if (res.status === 200) {
          setSoldiers(res.data);
        } else {
          throw new Error("error fetching soldiers");
        }
      } catch (error) {
        alert(error.message);
      }
    };
    fetchSoldiers();
  }, [username, misparIshi]);
  useEffect(() => {
    if (!userDisplayName) {
      navigate("/home");
    }
  }, [userDisplayName]);
  return (
    <div className={styles.body}>
      {soldiers ? (
        <button className={styles.btn} onClick={() => setIsOpen(true)}>
          פתיחת חלון
        </button>
      ) : null}

      {isOpen ? (
        <MadorPopUp
          soldiers={soldiers}
          setSoldiers={setSoldiers}
          setIsOpen={setIsOpen}
        />
      ) : null}
    </div>
  );
};

export default Mador;
