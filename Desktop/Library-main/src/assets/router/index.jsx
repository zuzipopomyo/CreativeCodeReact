
import {createBrowserRouter,} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../../pages/Home";
import About from "../../pages/About"

import Create from "../../pages/Create";
import BookDetail from "../../pages/BookDetail"
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
            path : "",
            element: <Home/>
        },
        {
          path : "/books/:id",
          element: <BookDetail/>
        },
        {
            path : "/create",
            element :<Create/>
        },
        {
            path : "/about",
            element : <About/>
        }
      ]
    },
  ]);

  export default router;