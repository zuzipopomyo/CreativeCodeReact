import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeContextProvider } from './pages/Contexts/ThemeContext';
import AuthContextProvider from './pages/Contexts/AuthContext';
import Router from './assets/router/index'

ReactDOM.createRoot(document.getElementById("root")).render(
    
   <AuthContextProvider>
      <ThemeContextProvider>
       <Router/>
      </ThemeContextProvider>
   </AuthContextProvider>
    

);