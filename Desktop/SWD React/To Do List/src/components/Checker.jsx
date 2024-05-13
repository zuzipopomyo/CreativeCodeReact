import React, { useState } from "react";

const Checker = () => {
    const [done,setDone] = useState(true)
    
    const handleInput = () =>{
        setDone(!done)
    }
    console.log(done)
  return (
    <div>
      <div>
        <h1 className="mb-3">Name Input</h1>
        <div className="flex justify-center gap-3 items-center">
          <input type="checkbox" checked={done} onChange={handleInput} className="w-10 h-10" id="h" />
          <label htmlFor="h" className="text-2xl cursor-pointer select-none">
            Check Me
          </label>
        </div>
      </div>
    </div>
  );
};

export default Checker;
