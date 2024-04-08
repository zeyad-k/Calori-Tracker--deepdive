import { useEffect, useState } from "react";
import CalorieRecorder from "./CalorieRecorder";
import styles from "./RecordList.module.css";

function RecordList(props) {
  const [totalCalories, setTotalCalories] = useState(0);

  const ResultsElement = props.records?.length ? (
    <ul className={styles["record-list"]}>
      {props.records.map((record) => (
        <li className={styles["list-item"]} key={record.id}>
          <CalorieRecorder
            recordDate={record.date}
            meal={record.meal}
            content={record.content}
            calories={record.calories}
            addCalories={setTotalCalories}
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
