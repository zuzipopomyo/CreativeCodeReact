import React from "react";

const Status = ({ tasks }) => {
  return (
    <div className="mb-5 status-box flex justify-between items-center font-heading">
      <h3 className="text-2xl font-bold">Your List</h3>
      <p className="bg-black text-sm text-white px-3 py-1 rounded-full">
        Done
        <span className="ms-2" id="doneCounter">
          {tasks.filter((el) => el.isDone === true).length}
        </span>{" "}
        / <span id="listCounter">{tasks.length}</span>
      </p>
    </div>
  );
};

export default Status;
