import React, { useState, useEffect } from "react";
import styles from "./Clock.module.css";

const Clock = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const formattedDate = now
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })

      const formattedTime = now
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.clock}>
      <div className={styles.time}>{currentTime} {currentDate}</div>
    </div>
  );
};

export default Clock;
