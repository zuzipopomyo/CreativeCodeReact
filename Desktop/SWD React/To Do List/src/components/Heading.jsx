import React from "react";

const Heading = ({ apptitle }) => {
  return (
    <div>
      <h1 className="text-black text-5xl p-3 m-3 font-serif ">{apptitle}</h1>
    </div>
  );
};

export default Heading;
