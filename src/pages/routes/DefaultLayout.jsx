import { Link, Outlet, useLoaderData } from "react-router-dom";
import Header from "../../components/header";
import UserId from "../../contexts/UserIdContext";
import Loader from "../../components/common/Loader";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth/cordova";
import { auth } from "../../scripts/firebaseAuth";
import UserPermission from "../../contexts/UserPermission";

export default function DefaultLayout(){
  const {userUid} = useLoaderData()
  const [userAllowed,setUserAllowed] = useState(null)

  if(userAllowed === null){
    onAuthStateChanged(auth,user =>{
      if(!user){
        setUserAllowed(false)
      } else {
        setUserAllowed(true)
      }
    })
  }

  return(
    <UserPermission.Provider value={userAllowed}>
      <>
        <div className="loader d-flex align-items-center justify-content-center fs-6 hide" id="navigation-loader">
          <div className="spinner-border text-white" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
      {
         userAllowed === false ?
          <div id="App" className="bg-dark">
            <header className="header mb-2 bg-dark">
              <nav className="navbar">
                <ul className="navbar-nav w-100 text-center">
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link text-white">Voltar a tela de login</Link>
                  </li>
                </ul>
              </nav>
            </header>
            <main className="container-fluid text-white text-center">
              <h2>Acesso negado!</h2>
            </main>
          </div>
          :
          <UserId.Provider value={userUid}>
            <div id="App" className="bg-dark">
              <Header />
              <main className="container-fluid text-white">
                <Outlet />
              </main>
            </div>
          </UserId.Provider>
      }
    </UserPermission.Provider>
  )
}