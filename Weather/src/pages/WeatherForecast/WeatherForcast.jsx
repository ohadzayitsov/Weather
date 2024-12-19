import styles from "./WeatherForcast.module.css";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import ChosenDay from "../../components/chosenDay/chosenDay";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SearchContext, WeatherContext } from "../../utils/context";

const WeatherForecast = ({ latlong, city }) => {
  const { dailyWeather, updateDailyWeather } = useContext(WeatherContext);
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${latlong.latitude}&lon=${latlong.longitude}&units=metric&appid=${process.env.ONE_CALL_API_KEY}&exclude=minutely,hourly,alerts&lang=he`
        );
        if (res.status === 200) {

          updateDailyWeather({ city: city, days: res.data.daily });
        }
      } catch (error) {
        console.log("error: " + error.message);
      }
    };
    if (dailyWeather.days.length === 0 || dailyWeather.city !== city) {
      fetchWeather();
    }
  }, [latlong, city]);

  const getIcon = (day) => {
    if (!day) {
      return;
    }
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
      {dailyWeather.days[0] ? (
        <div>
          <ChosenDay
            icon={getIcon(dailyWeather.days[0])}
            day={getHebrewDayDescription(dailyWeather.days[0].dt)}
            desc={dailyWeather.days[0].weather[0].description}
            temp={getTemp(dailyWeather.days[0].temp)}
            city={city}
            backgroundColor={getBackgroundColor(dailyWeather.days[0])}
          />
          <div className={styles.forecastContainer}>
            {dailyWeather.days.map((day, index) =>
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
