import styles from "./WeatherCard.module.css";
import icons from "../../utils/icons/icons";

const WeatherCard = ({backgroundColor, icon, day, temp }) => {
  return (
    <div className={styles.body} style={{backgroundColor:backgroundColor}}>
      <div className={styles.day}>{day}</div>
      {icons[icon]('90px')}
      <div className={styles.temp}>{temp}°C</div>
    </div>
  );
};

export default WeatherCard;
