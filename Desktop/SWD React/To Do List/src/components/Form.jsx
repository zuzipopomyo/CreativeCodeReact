import React, { useState } from "react";


const Form = ({ addTask }) => {
  const [input, setInput] = useState("");

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleAddBtn = () => {
    const newTask = {
      id: Date.now(),
      job: input,
      isDone: false,
    };
    addTask(newTask);
    setInput(""); // Clear input field after adding task
  };

  return (
    <div className="add-new-list flex border mb-10">
      <input
        value={input}
        onChange={handleInput}
        id="textInput"
        className="focus-visible:outline-none px-3 flex-grow border-2 border-black"
        type="text"
      />
      <button
        onClick={handleAddBtn}
        id="addButton"
        className="bg-black text-white p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
};

export default Form;
