import React from "react";
import Heading from "./components/Heading";
import Form from "./components/Form";
import Status from "./components/Status";
import ListGroup from "./components/ListGroup";
import { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, job: "Complete homework", isDone: true },
    { id: 2, job: "Buy groceries", isDone: false },
    { id: 3, job: "Call friend", isDone: true },
    { id: 4, job: "Read a book", isDone: false },
    { id: 5, job: "Go for a walk", isDone: true },
  ]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((el) => el.id !== id));
  };

  const doneTask = (id) => {
    setTasks(tasks.map((el) => el.id === id ? { ...el, isDone:!el.isDone} :el));
  };

  return (
    <div className=" h-screen flex justify-center items-center bg-gray-100 ">
      <div className=" w-[400px]">
        <Heading apptitle="To Do App" />
        <Form addTask={addTask} />
        <Status tasks={tasks} />
        <ListGroup tasks={tasks} deleteTask={deleteTask} doneTask={doneTask} doneTask={doneTask}/>
      </div>
    </div>
  );
};

export default App;
