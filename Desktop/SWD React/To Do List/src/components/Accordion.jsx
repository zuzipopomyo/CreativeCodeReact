import React, { useState } from 'react';

const Accordion = () => {
    const [open, setOpen] = useState(true);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className='border border-gray-400'>
            <div>
            <h4 onClick={handleOpen} className='bg-sky-200 p-3 select-none cursor-pointer'>This is Title</h4>

            </div>
            <div className={`${open ? "" : "hidden"} animate__animated animate__backInLeft`}>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, veniam ipsum, asperiores blanditiis sapiente, vero quia beatae tempore adipisci accusamus quasi facilis distinctio! Aperiam dolore necessitatibus odit accusamus labore quia.</p>
            </div>
        </div>
    );
};

export default Accordion;
