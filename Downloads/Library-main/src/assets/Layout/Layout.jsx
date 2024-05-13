
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { SwitchTransition,CSSTransition } from 'react-transition-group'
import "./transition.css"
export default function Layout() {
  const location = useLocation();

  return (
    
   <div>
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

