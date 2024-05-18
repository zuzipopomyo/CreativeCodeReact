import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import router from './assets/router';
import './index.css'
import { ThemeContextProvider } from './pages/Contexts/ThemeContext';


ReactDOM.createRoot(document.getElementById("root")).render(
    
    <ThemeContextProvider>
    <RouterProvider router={router} />
  </ThemeContextProvider>
    

);