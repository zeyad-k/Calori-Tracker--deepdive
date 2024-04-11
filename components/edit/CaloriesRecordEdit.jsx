import { useState, useEffect, useReducer } from "react";
import styles from "./CaloriesRecordEdit.module.css";

const Default_Value = {
  date: { value: "", valid: false },
  meal: { value: "Breakfast", valid: true },
  content: { value: "", valid: false },
  calories: { value: "0", valid: true },
};

function formReducer(state, action) {
  const { type, key, value } = action;
  if (type === "RESET") {
    return Default_Value;
  }
  let valid = false;
  switch (key) {
    case "content":
      valid =
        (value === "sport" && state.calories.value < 0) ||
        (value !== "sport" && state.calories.value >= 0);
      return {
        ...state,
        content: { value, valid: !!value },
        calories: { ...state.calories, valid },
      };
    case "calories":
      valid =
        (state.content.value === "sport" && value < 0) ||
        (state.content.value !== "sport" && value >= 0);
      return {
        ...state,
        calories: { value, valid },
      };

    default:
      return {
        ...state,
        [key]: { value, valid: !!value },
      };
  }
}

function CalorieRecordEdit(props) {
  // const [mealRecord, setMealRecord] = useState(Default_Value);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formState, dispatchFn] = useReducer(formReducer, Default_Value);
  const {
    date: { valid: isDateValid },
    content: { valid: isContentValid },
    calories: { valid: isCaloriesValid },
  } = formState;

  useEffect(() => {
    setIsFormValid(isDateValid && isContentValid && isCaloriesValid);
  }, [isDateValid, isContentValid, isCaloriesValid]);

  const onDateChange = (event) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      key: "date",
      value: event.target.value,
    });
  };

  const onMealChange = (event) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      key: "meal",
      value: event.target.value,
    });
  };

  const onContentChange = (event) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      key: "content",
      value: event.target.value,
    });
  };

  const onCaloriesChange = (event) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      key: "calories",
      value: event.target.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit(
      Object.keys(formState).reduce((agg, cur) => {
        agg[cur] = formState[cur].value;
        return agg;
      }, {})
    );
    dispatchFn({
      action: "RESET",
    });
  };

  const cancelRecordButtonHandler = () => {
    dispatchFn({
      action: "RESET",
    });
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
          value={formState.date.value}
          onChange={onDateChange}
          className={`${styles["form-input"]} ${
            !isDateValid ? styles.error : ""
          }`}
        />

        <label htmlFor="meal">Meal:</label>
        <select
          name="meal"
          id="meal"
          value={formState.meal.value}
          onChange={onMealChange}
          className={`${styles["form-input"]}`}
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
          value={formState.content.value}
          onChange={onContentChange}
          className={`${styles["form-input"]} ${
            !isContentValid ? styles.error : ""
          }`}
        />
        <label htmlFor="calories">Calories:</label>
        <input
          type="number"
          id="calories"
          name="calories"
          value={formState.calories.value}
          onChange={onCaloriesChange}
          className={`${styles["form-input"]} ${
            formState.calories.value < 0 ? styles.error : ""
          }`}
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
