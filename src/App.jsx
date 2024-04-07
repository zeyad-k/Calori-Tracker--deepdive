import { useState } from "react";

import Counter from "../components/Counter";
import CalorieRecordEdit from "../components/edit/CaloriesRecordEdit";
import styles from "./App.module.css";
import ListingSection from "../components/ListingSection";
import { getDateFormString } from "../helpers";

import Modal from "react-modal";

const DEFAULT_RECORDS = [
  {
    id: 1,
    date: new Date(2023, 2, 6),
    meal: "Breakfast",
    content: "Eggs + Beans",
    calories: 340,
  },
  {
    id: 2,
    date: new Date(2023, 3, 7),
    meal: "Launch",
    content: "Chicken",
    calories: 480,
  },
  {
    id: 3,
    date: new Date(2024, 3, 10),
    meal: "Dinner",
    content: "Pizza",
    calories: 500,
  },
  {
    id: 4,
    date: new Date(2023, 12, 12),
    meal: "snakes",
    content: "Beans",
    calories: 200,
  },
];

function App() {
  const [records, setRecords] = useState(DEFAULT_RECORDS);
  const [nextId, setNextId] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      id: nextId,
    };

    setNextId((lastVal) => lastVal + 1);
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
          />
        </Modal>
        <ListingSection allRecords={records} />
        <button className={styles["open-modal-btn"]} onClick={handleOpenModal}>
          Track Food
        </button>
        <Counter />
        <Counter />
      </div>
    </>
  );
}
export default App;
