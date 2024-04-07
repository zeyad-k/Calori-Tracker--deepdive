import RecordList from "./RecordList";
import styles from "./ListingSection.module.css"; // Corrected import
import { useState } from "react"; // Added import for useState
import { getDateFormString } from "../helpers";

function ListingSection(props) {
  const { allRecords } = props;
  const [currentDate, setCurrentDate] = useState(new Date()); // Added import for useState
  //  filter records based on date

  const dateFilter = (record) => {
    return (
      record.date.getDate() === currentDate.getDate() &&
      record.date.getMonth() === currentDate.getMonth() &&
      record.date.getFullYear() === currentDate.getFullYear()
    ); // Added condition to filter records based on date
  };
  const dateChangeHandler = (event) => {
    setCurrentDate(getDateFormString(event.target.value)); // Added event handler to set current date
  };

  return (
    <>
      <label className={styles["listing-picker-label"]} htmlFor="listingDate">
        Select Date
      </label>
      <input
        type="date"
        id="listingDate"
        className={styles["listing-picker-input"]} // Added class to input
        value={currentDate.toISOString().split("T")[0]} // Added value attribute
        onChange={dateChangeHandler} // Added onChange event handler
      />
      <RecordList records={allRecords.filter(dateFilter)} />
    </>
  );
}

export default ListingSection;
