import { useContext, useEffect, useState } from "react";
import styles from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/context";
import axios from "axios";
import WeatherForecast from "../WeatherForecast/WeatherForcast";
import CitiesInput from "../../components/CitiesInput/CitiesInput";

const LandingPage = () => {
  const { userDisplayName, updateUserDisplayName } = useContext(UserContext);
  const { misparIshi, updateMisparIshi } = useContext(UserContext);
  const { username, updateUsername } = useContext(UserContext);
  const [latlong, setLatLong] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const userString = localStorage.getItem("user");

      if (!userString) {
        navigate("/login");
        return;
      }

      const user = JSON.parse(userString);

      if (user) {
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
  const handleSetLocation = (latlong, city) => {
    setCity(city);
    setLatLong(latlong);
  };
  return (
    <div className={styles.container}>
      <CitiesInput handleSetLocation={handleSetLocation} />
      {city && latlong ? (
        <WeatherForecast latlong={latlong} city={city} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default LandingPage;
