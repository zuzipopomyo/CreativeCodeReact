
import { Outlet, useLocation } from 'react-router-dom'
import { SwitchTransition,CSSTransition } from 'react-transition-group'
import "./transition.css"
import Navbar from '../../assets/Components/Navbar.jsx';
import useTheme from '../../hooks/useTheme.js';
import { useEffect } from 'react';

export default function Layout() {
  const location = useLocation();

  let {isDark} = useTheme();

  useEffect(()=>{
    let body = document.body;
    if(isDark){
      body.classList.add('bg-black')
    }else{
      body.classList.remove('bg-black')
    }
  },[isDark])

  return (
    
   <div className={`${isDark ? 'bg-black' : ''}`}>
   <Navbar/>
  <SwitchTransition>
    <CSSTransition timeout={200} className="fade" key={location.pathname}>
    <div className=''>
     <Outlet/>
   </div>
    </CSSTransition>
  </SwitchTransition> 
   
   </div>
  )
}

