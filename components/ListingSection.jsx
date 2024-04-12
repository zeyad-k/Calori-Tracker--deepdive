import RecordList from "./RecordList";
import styles from "./ListingSection.module.css"; // Corrected import
import { useContext } from "react"; // Added import for useState
import { AppContext } from "../src/AppContext";

function ListingSection(props) {
  const { allRecords } = props;
  const { currentDate, currentDateString, setCurrentDate } =
    useContext(AppContext);

  const dateFilter = (record) => {
    return (
      record.date.getDate() === currentDate.getDate() &&
      record.date.getMonth() === currentDate.getMonth() &&
      record.date.getFullYear() === currentDate.getFullYear()
    ); // Added condition to filter records based on date
  };
  const dateChangeHandler = (event) => {
    setCurrentDate(event.target.value); // Added event handler to set current date
  };

  return (
    <>
      <label className={styles["listing-picker-label"]} htmlFor="listingDate">
        Select Date
      </label>
      <input
        type="date"
        id="listingDate"
        className={styles["listing-picker-input"]}
        value={currentDateString}
        onChange={dateChangeHandler}
      />
      <RecordList records={allRecords.filter(dateFilter)} />
    </>
  );
}

export default ListingSection;
