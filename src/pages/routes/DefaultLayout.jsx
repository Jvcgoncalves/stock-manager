import { Outlet } from "react-router-dom";
import Header from "../../components/header";

export default function DefaultLayout(){
  return(
    <div id="App" className="bg-dark">
      <Header />
      <main className="container-fluid text-white">
        <Outlet />
      </main>
    </div>
  )
}