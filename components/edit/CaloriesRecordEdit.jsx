import { useState, useEffect, useReducer, useContext, useRef } from "react";
import styles from "./CaloriesRecordEdit.module.css";
import { AppContext } from "../../src/AppContext";

const Default_Value = {
  meal: true,
  content: false,
  calories: true,
};

function formReducer(state, action) {
  const { key, value, auxValue } = action;

  let valid;
  switch (key) {
    case "content":
      valid =
        (value === "sport" && auxValue < 0) ||
        (value !== "sport" && auxValue >= 0);
      return {
        ...state,
        content: !!value,
        calories: valid,
      };
    case "calories":
      valid =
        (auxValue === "sport" && value < 0) ||
        (auxValue !== "sport" && value >= 0);
      return {
        ...state,
        calories: valid,
      };

    default:
      return {
        ...state,
        meal: !!value,
      };
  }
}

function CalorieRecordEdit(props) {
  const {
    isDateValid,
    currentDate,
    currentDateString,
    setCurrentDate,
    totalCalories,
  } = useContext(AppContext);
  const [isFormValid, setIsFormValid] = useState(false);

  const [formState, dispatchFn] = useReducer(formReducer, Default_Value);

  const contentRef = useRef();
  const caloriesRef = useRef();
  const mealRef = useRef();

  const { content: isContentValid, calories: isCaloriesValid } = formState;

  useEffect(() => {
    if (!isContentValid) {
      contentRef.current.focus();
    }
    setIsFormValid(isDateValid && isContentValid && isCaloriesValid);
  }, [isDateValid, isContentValid, isCaloriesValid]);

  const onDateChange = (event) => {
    setCurrentDate(event.target.value);
  };

  const onMealBlur = (event) => {
    dispatchFn({
      key: "meal",
      value: event.target.value,
    });
  };

  const onContentBlur = (event) => {
    dispatchFn({
      key: "content",
      value: event.target.value,
      auxValue: Number(caloriesRef.current.value),
    });
  };

  const onCaloriesBlur = (event) => {
    dispatchFn({
      key: "calories",
      value: Number(event.target.value),
      auxValue: contentRef.current.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit({
      date: currentDate,
      meal: mealRef.current.value,
      content: contentRef.current.value,
      calories: Number(caloriesRef.current.value),
    });
  };

  const cancelRecordButtonHandler = () => {
    props.onCancel();
  };

  return (
    <div>
      {/* <h2>Calorie Record Edit</h2> */}
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <p className={styles.warning}>You Spent {totalCalories} Calories</p>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={currentDateString}
          onChange={onDateChange}
          className={`${styles["form-input"]} ${
            !isDateValid ? styles.error : ""
          }`}
        />

        <label htmlFor="meal">Meal:</label>
        <select
          name="meal"
          id="meal"
          // value={formState.meal.value}
          onBlur={onMealBlur}
          className={`${styles["form-input"]}`}
          ref={mealRef}
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
          ref={contentRef}
          // value={formState.content.value}
          onBlur={onContentBlur}
          className={`${styles["form-input"]} ${
            !isContentValid ? styles.error : ""
          }`}
        />
        <label htmlFor="calories">Calories:</label>
        <input
          type="number"
          id="calories"
          name="calories"
          // value={formState.calories.value}
          onBlur={onCaloriesBlur}
          className={`${styles["form-input"]} ${
            formState.calories.value < 0 ? styles.error : ""
          }`}
          ref={caloriesRef}
          // min={0}
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
