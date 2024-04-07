import { useState } from "react";

import styles from "./CalorieRecorder.module.css";
import CalorieRecordDate from "./CalorieRecordDate";
import StyledRecordCell from "./StyledRecordCell";

function CalorieRecorder(props) {
  let recordContent = (
    <>
      <li>{props.meal}</li>
      <li>{props.content}</li>
    </>
  );

  if (props.calories <= 0) {
    recordContent = (
      <>
        <li></li>
        <li>Invalid Content</li>
      </>
    );
  }
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