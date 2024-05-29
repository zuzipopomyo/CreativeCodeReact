
import {Navigate, RouterProvider, createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../../pages/Home";
import About from "../../pages/About"
import BookDetail from "../../pages/BookDetail"
import BookForm from "../../pages/BookForm";
import Login from "../../pages/Login";
import { Register } from "../../pages/Register"
import { useContext } from "react";
import { AuthContext } from "../../pages/Contexts/AuthContext";
  
  export default function index() {

    let {authReady,user} =  useContext(AuthContext)

    //router-route-gap

    const isAuthenticated = Boolean (user);

    const router = createBrowserRouter([
      {
        path: "/",
        element: <Layout/>,
        children:[
          {
              path : "",
              element: isAuthenticated ?  <Home/> : <Navigate to='/login'/>
          },
          {
            path : "/books/:id",
            element: isAuthenticated ?  <BookDetail/> : <Navigate to='/login'/>
          },
          {
              path : "/create",
              element : isAuthenticated ? <BookForm/> : <Navigate to='/login'/>
          },
          {
            path : "/edit/:id",
            element : isAuthenticated ? <BookForm/> : <Navigate to='/login'/>
          },
          {
              path : "/about",
              element : isAuthenticated ?  <About/> : <Navigate to='/login'/>
          },
          {
            path : "/login",
            element : !isAuthenticated ?  <Login/> : <Navigate to='/'/>
          },
          {
            path : "/register",
            element :!isAuthenticated ? <Register/> : <Navigate to='/'/>
          }
        ]
      },
    ]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
  
    return (
            !!authReady &&  <RouterProvider router={router}/>
    )
  }
  