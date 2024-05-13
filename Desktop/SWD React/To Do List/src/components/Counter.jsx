import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1);
  };

  const sub = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="font-mono">
      <h1 className="text-4xl font-bold mb-4">Counter : {count}</h1>
      <div className="flex gap-3 ">
        <button onClick={add} className="bg-sky-500 rounded-lg text-2xl p-3">
          Add (+)
        </button>
        <button onClick={sub} className="bg-sky-500 rounded-lg text-2xl p-3">
          Sub (-)
        </button>
      </div>
    </div>
  );
};

export default Counter;
