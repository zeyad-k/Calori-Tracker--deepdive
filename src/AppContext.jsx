import { createContext, isValidElement, useState } from "react";
import { getDateFormString } from "../helpers";

export const AppContext = createContext({
  currentDate: new Date(),
  setCurrentDate: (val) => {},
  totalCalories: 0,
  setTotalCalories: (val) => {
    return val;
  },
  currentDateString: "",
  isDateValid: false,
});

function AppContextProvider(props) {
  const { children } = props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [totalCalories, setTotalCalories] = useState(0);

  const updateCurrentDate = (val) => {
    setCurrentDate(getDateFormString(val));
  };

  const currentDateString = currentDate
    ? currentDate.toISOString().split("T")[0]
    : "";

  return (
    <AppContext.Provider
      value={{
        currentDate,
        setCurrentDate: updateCurrentDate,
        totalCalories,
        setTotalCalories,
        currentDateString,
        isDateValid: !!currentDateString,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
