import axios from "axios";
import styles from "./CitiesInput.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../utils/context";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CitiesInput = ({ handleSetLocation }) => {
  const { username, updateusername } = useContext(AppContext);
  const { misparIshi, updateMisparIshi } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState("Jerusalem");
  const [cities, setCities] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (username && misparIshi) {
      handleSetCities();
    }
  }, [username, misparIshi]);

  const handleSetCities = async () => {
    try {
      const res = await axios.get("http://localhost:3001/getAllCities", {
        headers: {
          user_name: username,
          user_mispar_ishi: misparIshi,
        },
      });
      setCities(res.data);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownVisible(true);
  };

  const handleOptionClick = (cityName) => {
    setSearchTerm(cityName);
    setIsDropdownVisible(false);
  };

  const handleIconClick = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/cities/${searchTerm}`, {
        headers: {
          user_name: username,
          user_mispar_ishi: misparIshi,
        },
      });
      if (res.status === 200) {
        handleSetLocation(res.data, searchTerm);
      }
    } catch (error) {
      console.error("Failed to fetch city data:", error);
    }
  };

  const filteredCities = cities.filter((city) =>
    city.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.dropdownContainer} ref={inputRef}>
        <div className={styles.inputWithIcon}>
          <input
            type="text"
            placeholder="הזן עיר..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownVisible(true)}
            className={styles.searchInput}
          />
          <div className={styles.searchIcon} onClick={handleIconClick}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
        {isDropdownVisible && searchTerm && (
          <div className={styles.optionsContainer}>
            {filteredCities.length > 0 ? (
              filteredCities.map((city, index) => (
                <div
                  key={index}
                  className={styles.option}
                  onClick={() => handleOptionClick(city.city)}
                >
                  {city.city}
                </div>
              ))
            ) : (
              <div className={styles.noResult}>לא נמצאו תוצאות</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CitiesInput;
