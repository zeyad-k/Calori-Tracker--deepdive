import { useEffect, useState } from "react";

import Counter from "../components/Counter";
import CalorieRecordEdit from "../components/edit/CaloriesRecordEdit";
import styles from "./App.module.css";
import ListingSection from "../components/ListingSection";
import { getDateFormString } from "../helpers";

import Modal from "react-modal";
const LOCAL_STORAGE_KEY = "calorieRecords";

function App() {
  const [records, setRecords] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); // Added import for useState
  const [totalCalories, setTotalCalories] = useState(0);

  function save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  }

  function loadRecords() {
    const storageRecords = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storageRecords != null && storageRecords !== "undefined") {
      // setRecords(JSON.parse(storageRecords)).map((record) => ({
      //   ...record,
      //   date: new Date(record.date),
      //   calories: Number(record.calories),
      // }));
      const parsedRecords = JSON.parse(storageRecords).map((record) => ({
        ...record,
        date: new Date(record.date),
        calories: Number(record.calories),
      }));

      setRecords(parsedRecords);
    } else {
      setRecords([]);
    }
  }

  useEffect(() => {
    if (!records) {
      loadRecords();
    } else {
      save();
    }
  }, [records]);

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      padding: "0px",
      borderRadius: "var(--theme-border-radius-smooth)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formSubmitHandler = (record) => {
    const formattedRecord = {
      ...record,
      date: getDateFormString(record.date),
      id: crypto.randomUUID(),
    };

    setRecords((prevRecords) => [formattedRecord, ...prevRecords]);

    handleCloseModal();
  };
  return (
    <>
      <div className="App">
        <h1 className={styles.title}>Calorie Tracker</h1>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Calorie Record Modal"
          style={modalStyles}
        >
          <CalorieRecordEdit
            onFormSubmit={formSubmitHandler}
            onCancel={handleCloseModal}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            totalCalories={totalCalories}
          />
        </Modal>
        {records && (
          <ListingSection
            allRecords={records}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            totalCalories={totalCalories}
            setTotalCalories={setTotalCalories}
          />
        )}
        <button className={styles["open-modal-btn"]} onClick={handleOpenModal}>
          Track Food
        </button>
      </div>
    </>
  );
}
export default App;
