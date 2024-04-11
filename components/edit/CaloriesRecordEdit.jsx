import { useState, useEffect } from "react";
import styles from "./CaloriesRecordEdit.module.css";
function CalorieRecordEdit(props) {
  const Default_Value = {
    date: "",
    meal: "Breakfast",
    content: "",
    calories: 0,
  };
  const [mealRecord, setMealRecord] = useState(Default_Value);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      mealRecord.date &&
        mealRecord.meal &&
        mealRecord.content &&
        mealRecord.calories > 0
    );
  }, [mealRecord]);

  const onDateChange = (event) => {
    setMealRecord({ ...mealRecord, date: event.target.value });
  };

  const onMealChange = (event) => {
    setMealRecord({ ...mealRecord, meal: event.target.value });
  };

  const onContentChange = (event) => {
    setMealRecord({ ...mealRecord, content: event.target.value });
  };

  const onCaloriesChange = (event) => {
    setMealRecord({ ...mealRecord, calories: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit(mealRecord);
    setMealRecord(Default_Value);
  };

  const cancelRecordButtonHandler = () => {
    setMealRecord(Default_Value);
    props.onCancel();
  };

  return (
    <div>
      {/* <h2>Calorie Record Edit</h2> */}
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={mealRecord.date}
          onChange={onDateChange}
        />

        <label htmlFor="meal">Meal:</label>
        <select
          name="meal"
          id="meal"
          value={mealRecord.meal}
          onChange={onMealChange}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Launch">Launch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
        <label htmlFor="content">Content:</label>
        <input
          type="text"
          id="content"
          name="content"
          value={mealRecord.content}
          onChange={onContentChange}
        />
        <label htmlFor="calories">Calories:</label>
        <input
          type="number"
          id="calories"
          name="calories"
          value={Number(mealRecord.calories)}
          onChange={onCaloriesChange}
          className={mealRecord.calories < 0 ? styles.error : ""}
        />
        <div className={styles.footer}>
          <button disabled={!isFormValid} type="submit">
            Add Record
          </button>
          <button
            className={styles.secondary}
            onClick={cancelRecordButtonHandler}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default CalorieRecordEdit;
