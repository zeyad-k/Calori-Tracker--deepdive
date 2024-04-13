import { memo } from "react";
import styles from "./Button.module.css";

function Button(props) {
  const { variant, children, ...rest } = props;
  console.log(variant);
  return (
    <button {...rest} className={styles[variant]}>
      {children}
    </button>
  );
}

export default memo(Button);
