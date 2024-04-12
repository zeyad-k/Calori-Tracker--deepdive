import { createContext } from "react";

const AppContext = createContext({
	currentDate :new Date(),
	setCurrentDate:(val)=>{ return val; },
	totalCalories:0,
	setTotalCalories:(val)=>{ return val; },
});

export default AppContext;