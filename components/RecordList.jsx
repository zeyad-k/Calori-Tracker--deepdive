import { useEffect, useState } from "react";
import CalorieRecorder from "./CalorieRecorder";
import styles from "./RecordList.module.css";
import { useContext } from "react";
import { AppContext } from "../src/AppContext";

function RecordList(props) {
  const { totalCalories, setTotalCalories } = useContext(AppContext); // Added import for useState
  const ResultsElement = props.records?.length ? (
    <ul className={styles["record-list"]}>
      {props.records.map((record) => (
        <li className={styles["list-item"]} key={record.id}>
          <CalorieRecorder
            recordDate={record.date}
            meal={record.meal}
            content={record.content}
            calories={record.calories}
            // addCalories={setTotalCalories}
          />
        </li>
      ))}
    </ul>
  ) : (
    <p className={styles.placeholder}>No records found for this date.</p>
  );

  return (
    <>
      {ResultsElement}
      <label htmlFor="">Total Calories: {totalCalories} </label>
    </>
  );
}

export default RecordList;
