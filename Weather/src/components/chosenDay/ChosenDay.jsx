import styles from "./ChosenDay.module.css";
import icons from "../../utils/icons/icons";

const ChosenDay = ({backgroundColor,icon,day,city,temp,desc}) => {
  
  return (
    <div className={styles.body} style={{backgroundColor:backgroundColor}}>
      <div className={styles.content}>
       {icons[icon]('180px')}
        <div className={styles.details}>
            <div className={styles.day}>{day}</div>
            <div className={styles.city}>{city}</div>
            <div className={styles.temp}> {temp+"C° "+ `:'טמפ`}</div>
            <div className={styles.desc}>{desc}</div>
        </div>
      </div>
    </div>
  );
};

export default ChosenDay;
