import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./routes/DefaultLayout";
import Home from "./routes/Home";
import homeLoader from "../loaders/homeLoader";

const routes = createBrowserRouter([
  {
    path:"/",
    element: <DefaultLayout />,
    children:[
      {
        index:true,
        element: <Home />,
        loader: homeLoader
      }
    ]
  }
])

export default routes