import styles from "./CalorieRecordDate.module.css";
import StyledRecordCell from "./StyledRecordCell";

function CalorieRecordDate(props) {
  const day = props.date.getDate();
  const month = props.date.toLocaleString("default", { month: "long" });
  const year = props.date.getFullYear();

  return (
    <StyledRecordCell>
      <div className={styles["record-date-month"]}>{month}</div>
      <div className={styles["record-date-day"]}>{day}</div>
      <div className={styles["record-date-year"]}>{year}</div>
    </StyledRecordCell>
  );
}

export default CalorieRecordDate;
