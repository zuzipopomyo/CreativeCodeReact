import React, { useState } from 'react'

const Input = () => {
   const [text,setText] = useState("")
   
   const handleInput = (event)=>{
        setText(event.target.value);
   }
   console.log(text)
  return (
    <div>
        <h1 className='mb-3'>Name Input</h1>
        <input type="text" className='w-full border-2 border-gray-500 rounded-lg '
        value={text}
        onChange={handleInput}
        />
    </div>
  )
}

export default Input