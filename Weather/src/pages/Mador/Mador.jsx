import { useContext, useEffect, useState } from "react";
import styles from "./Mador.module.css";
import MadorPopUp from "./MadorModal";
import { UserContext } from "../../utils/context";
import { useNavigate } from "react-router-dom";

const Mador = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {userDisplayName,updateUserDisplayName} = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
      if (!userDisplayName) {
        navigate("/home");
      }
    }, [userDisplayName]);
  return (
    <div className={styles.body}>
      <button className={styles.btn} onClick={() => setIsOpen(true)}>
        פתיחת חלון
      </button>
      {isOpen ? <MadorPopUp setIsOpen={setIsOpen} /> : null}
    </div>
  );
};

export default Mador;
