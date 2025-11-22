import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Aktueller Zähler: {count}</p>
      <button onClick={() => setCount(count + 1)}>Erhöhen</button>
    </div>
  );
};

export default Counter;
