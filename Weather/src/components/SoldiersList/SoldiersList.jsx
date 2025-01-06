import React from "react";
import styles from "./SoldiersList.module.css";
import SoldierCard from "../SoldierCard/SoldierCard";

const SoldiersList = ({ soldiers, title }) => {
  
  const sortedSoldiers = [...soldiers].sort((curr, next) => {
    const firstNameComparison = curr.First_Name.localeCompare(next.First_Name, "he");
    if (firstNameComparison === 0) {
      return curr.Last_Name.localeCompare(next.Last_Name, "he");
    }
    return firstNameComparison;
  });

  return (
    <div>
      <div className={styles.locationContainer}>
        <div className={styles.locationTitle}>
          {title} ({sortedSoldiers.length})
        </div>
        <div className={styles.soldiersList}>
          {sortedSoldiers.map((soldier) => (
            <SoldierCard
              key={soldier.Mispar_Ishi}
              firstName={soldier.First_Name}
              lastName={soldier.Last_Name}
              role={soldier.Role}
              rank={soldier.Rank}
              isKatzin={soldier.Is_Officer}
              age={soldier.Age}
              gender={soldier.Gender}
              misparIshi={soldier.Mispar_Ishi}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoldiersList;
