import { forwardRef } from "react";
import styles from "./FormInput.module.css";

const FormInput = forwardRef((props, ref) => {
  const { label, id, type, onBlur, isValid } = props;
  return (
    <>
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        id={id}
        onBlur={onBlur}
        className={`${styles["form-input"]} ${!isValid ? styles.error : ""}`}
        ref={ref}
      />
    </>
  );
});
export default FormInput;
