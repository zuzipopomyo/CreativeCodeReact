import React, { useState } from "react";
import List from "./List";

const ListGroup = ({ tasks, deleteTask,doneTask }) => {
  return (
    <div>
      {tasks.map(({ id, job, isDone }) => (
        <List
          deleteTask={deleteTask}
          doneTask={doneTask}
          key={id}
          id={id}
          job={job}
          isDone={isDone}
        />
      ))}
    </div>
  );
};

export default ListGroup;
