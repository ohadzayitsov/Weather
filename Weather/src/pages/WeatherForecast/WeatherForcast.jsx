import styles from "./WeatherForcast.module.css";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import ChosenDay from "../../components/chosenDay/chosenDay";
import { useContext, useEffect } from "react";
import axios from "axios";
import { SearchContext } from "../../utils/context";

const WeatherForecast = () => {
  const { selectedSearch, updateSelectedSearch } = useContext(SearchContext);
  const { lastSearches, updateLastSearches } = useContext(SearchContext);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (!selectedSearch?.days || selectedSearch.days.length === 0) {
          const res = await axios.get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${selectedSearch.latLong.latitude}&lon=${selectedSearch.latLong.longitude}&units=metric&appid=${process.env.ONE_CALL_API_KEY}&exclude=minutely,hourly,alerts&lang=he`
          );
          if (res.status === 200) {
            updateSelectedSearch({ ...selectedSearch, days: res.data.daily });
            updateLastSearches({ ...selectedSearch, days: res.data.daily });
          }
        }
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    };
  
    if (selectedSearch?.latLong && (!selectedSearch?.days || selectedSearch.days.length === 0)) {
      fetchWeather();
    }
  }, [selectedSearch, updateSelectedSearch, updateLastSearches]);
  
  const getIcon = (day) => {
    if (!day) return;
    let icon;
    if (day.temp.day > 29) {
      icon = "sunny";
    } else if (day.clouds > 20) {
      icon = "cloudy";
    } else if (day.pop > 40) {
      icon = "rainy";
    } else {
      icon = "rainbow";
    }
    return icon;
  };

  const getHebrewDayDescription = (timestamp) => {
    const inputDate = new Date(timestamp * 1000);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    const dayDifference = Math.round(
      (inputDate - today) / (1000 * 60 * 60 * 24)
    );

    switch (dayDifference) {
      case 0:
        return "היום";
      case 1:
        return "מחר";
      case 2:
        return "בעוד יומיים";
      default:
        return `בעוד ${dayDifference} ימים`;
    }
  };

  const getTemp = (temp) => {
    return Math.round((temp.max + temp.eve) / 2);
  };

  const getBackgroundColor = (day) => {
    const feelsLike = Object.values(day.feels_like);
    const temps = Object.values(day.temp);
    let count = 0;

    feelsLike.forEach((feelsTemp, index) => {
      if (feelsTemp > temps[index] + 1) {
        count++;
      }
    });

    if (count > 2) {
      return "rgb(237 2 2 / 20%)";
    } else if (count === 2) {
      return "rgb(239 141 1 / 25%)";
    } else if (count === 1) {
      return "rgb(128 128 128 / 25%)";
    } else {
      return "rgba(255, 255, 255, 0.27)";
    }
  };

  return (
    <div className={styles.body}>
      {selectedSearch?.days?.length > 0 ? (
        <div className={styles.center}>
          <ChosenDay
            icon={getIcon(selectedSearch.days[0])}
            day={getHebrewDayDescription(selectedSearch.days[0].dt)}
            desc={selectedSearch.days[0].weather[0].description}
            temp={getTemp(selectedSearch.days[0].temp)}
            city={selectedSearch.city}
            backgroundColor={getBackgroundColor(selectedSearch.days[0])}
          />
          <div className={styles.forecastContainer}>
            {selectedSearch.days.map((day, index) =>
              0 < index && index < 5 ? (
                <WeatherCard
                  day={getHebrewDayDescription(day.dt)}
                  temp={getTemp(day.temp)}
                  icon={getIcon(day)}
                  backgroundColor={getBackgroundColor(day)}
                  key={index}
                />
              ) : null
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherForecast;
