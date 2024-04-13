import { useState, useEffect, useReducer, useContext, useRef } from "react";
import styles from "./CaloriesRecordEdit.module.css";
import { AppContext } from "../../src/AppContext";
import FormInput from "../common/FormInput";
import Button from "../common/Button";

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

        <FormInput
          onChange={onDateChange}
          value={currentDateString}
          type="date"
          label="Date"
          id="date"
          isValid={isDateValid}
        />

        <FormInput
          type="select"
          label="Meal"
          id="meal"
          onBlur={onMealBlur}
          ref={mealRef}
          isValid
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Launch">Launch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </FormInput>

        <FormInput
          type="text"
          label="Content"
          id="content"
          onBlur={onContentBlur}
          isValid={isContentValid}
          ref={contentRef}
        />

        <FormInput
          type="number"
          label="Calories"
          id="calories"
          onBlur={onCaloriesBlur}
          isValid={isCaloriesValid}
          ref={caloriesRef}
        />

        <div className={styles.footer}>
          <Button variant="primary" disabled={!isFormValid}>
            Add Record
          </Button>

          <Button
            variant="secondary"
            onClick={cancelRecordButtonHandler}
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
export default CalorieRecordEdit;
