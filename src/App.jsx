import { RouterProvider } from "react-router-dom"
import routes from "./pages/Router"
import "./sass/index.scss"
function App() {
  return (
    <RouterProvider router={routes}/>
  )
}

export default App
