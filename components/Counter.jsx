import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>العداد: {count}</p>

      <button onClick={increment}>زيادة</button>
    </div>
  );
};

export default Counter;