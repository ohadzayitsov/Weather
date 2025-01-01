import React, { useState, useEffect } from "react";
import styles from "./SoldierCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import man from "../../assets/man.png";
import clsx from "clsx";
import { Woman } from "../../utils/icons/icons";
import { Katzin } from "../../utils/icons/icons";
const SoldierCard = ({
  firstName,
  lastName,
  age,
  gender,
  role,
  rank,
  isKatzin,
  misparIshi,
  selectedSoldiers,
  setSelectedSoldiers,
}) => {
  const handleClickSoldier = () => {
    if (selectedSoldiers.find((soldier) => soldier.Mispar_Ishi === misparIshi)) {
      setSelectedSoldiers(
        selectedSoldiers.filter((soldier) => soldier.Mispar_Ishi !== misparIshi)
      );
    } else {
      setSelectedSoldiers((prev) => [...prev, { Mispar_Ishi:misparIshi }]);
    }
  };

  return (
    <div
      className={clsx(
        styles.body,
        selectedSoldiers.find((soldier) => soldier.Mispar_Ishi === misparIshi) &&
          styles.selected
      )}
      onClick={handleClickSoldier}
    >
      <div className={styles.icon}>
        {gender === "ז" ? (
          <img src={man} className={styles.man} />
        ) : (
          <div className={styles.woman}>{Woman()}</div>
        )}

        {isKatzin ? (
          <div className={styles.svgContainer}>{Katzin()}</div>
        ) : null}
      </div>

      <div className={styles.info}>
        <div className={styles.name}>
          {firstName} {lastName}
        </div>
        <div className={styles.role}>
          {role} , {age}
        </div>
        <div className={styles.association}>
          {rank} , {role}
        </div>
      </div>
    </div>
  );
};

export default SoldierCard;
