import { useContext, useEffect, useState } from "react";
import styles from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import { SearchContext, UserContext } from "../../utils/context";
import axios from "axios";
import WeatherForecast from "../WeatherForecast/WeatherForcast";
import CitiesInput from "../../components/CitiesInput/CitiesInput";
import { RotatingLines } from "react-loader-spinner";
const LandingPage = () => {
  const { userDisplayName, updateUserDisplayName } = useContext(UserContext);
  const { misparIshi, updateMisparIshi } = useContext(UserContext);
  const { username, updateUsername } = useContext(UserContext);
  const {selectedSearch,updateSelectedSearch} = useContext(SearchContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const userString = localStorage.getItem("user");

      if (!userString) {
        navigate("/login");
        return;
      }
      const user = JSON.parse(userString);

      if (user && (!username || !misparIshi)) {
        const currUser = await getUser(user.username, user.misparIshi);

        if (currUser) {
          updateMisparIshi(currUser.Mispar_Ishi);
          updateUsername(currUser.User_Name);
          updateUserDisplayName(`${currUser.First_Name} ${currUser.Last_Name}`);
        } else {
          updateUserDisplayName(null);
          navigate("/login");
        }
      }
    };

    fetchUser();
  }, [updateUserDisplayName]);
  const getUser = async (username, misparIshi) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/login",
        {
          username,
          misparIshi,
        },
        {
          headers: {
            user_name: username,
            user_mispar_ishi: misparIshi,
          },
        }
      );

      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    return null;
  };

  
  return (
    <div className={styles.container}>
      <CitiesInput
        setIsLoaded={setIsLoaded}
      />
      {isLoaded ? (
        <div>
          {selectedSearch ? (
            <WeatherForecast />
          ) : null}
        </div>
      ) : (
        <div className={styles.loading}>
          
          <RotatingLines
            strokeColor="blue"
            strokeWidth="5"
            animationDuration="0.75"
            width="200"
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
