import { useContext, useEffect } from "react";

import styles from "./CalorieRecorder.module.css";
import CalorieRecordDate from "./CalorieRecordDate";
import StyledRecordCell from "./StyledRecordCell";
import { AppContext } from "../src/AppContext";

function CalorieRecorder(props) {
  const { setTotalCalories: addCalories } = useContext(AppContext);
  let recordContent = (
    <>
      <li>{props.meal}</li>
      <li>{props.content}</li>
    </>
  );

  useEffect(() => {
    addCalories((prevTotal) => Number(prevTotal) + Number(props.calories));
    return () => {
      addCalories((prevTotal) => Number(prevTotal) - Number(props.calories));
    };
  }, []);

  return (
    <ul className={styles.record}>
      <li>
        <CalorieRecordDate date={props.recordDate} />
      </li>
      {recordContent}
      <li className={styles["record-calories"]}>
        <StyledRecordCell>{props.calories}</StyledRecordCell>
      </li>
    </ul>
  );
}

export default CalorieRecorder;
