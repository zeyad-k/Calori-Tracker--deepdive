import CalorieRecorder from "./CalorieRecorder";
import styles from "./RecordList.module.css";
function RecordList(props) {
  return props.records?.length ? (
    <ul className={styles["record-list"]}>
      {props.records.map((record) => (
        <li className={styles["list-item"]} key={record.id}>
          <CalorieRecorder
            recordDate={record.date}
            meal={record.meal}
            content={record.content}
            calories={record.calories}
          />
        </li>
      ))}
    </ul>
  ) : (
    <p className={styles.placeholder}>No records found for this date.</p>
  );
}
export default RecordList;
