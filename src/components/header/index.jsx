import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserId from "../../contexts/UserIdContext";
import { signOut } from "firebase/auth/cordova";
import { auth } from "../../scripts/firebaseAuth";
import deleteUserFromDataBase from "../../scripts/deleteUser";
import toggleMenu from "../../scripts/responsiveMenu";

export default function Header(){
  const navigation = useNavigate()

  const userUid = useContext(UserId)

  const userSingOut = () => {
    signOut(auth).then(() => {
      navigation("/")
    })
  }
  return(
    <header className="header mb-2 bg-dark">
      <div className="d-flex justify-content-between container text-white align-items-center ">
        <h1 className="h2 mb-0">
          Store Stock
        </h1>
        <button className="menu-hamburguer hide border-0 text-white" onClick={toggleMenu}>
          <i className="bi bi-list"></i>
        </button>
        <nav className="navbar bg-dark mb-0">
          <ul className="navbar-nav d-flex flex-row gap-3 mb-0" onClick={toggleMenu}>
              <li className="nav-item mb-0" 
              onClick={() =>
                {
                  if(confirm("Deseja excluir sua conta?")) {
                    deleteUserFromDataBase().then(()=>navigation("/"))
                  }
                }}
              >
              <button className="nav-link text-white">
                Excluir conta
              </button>
            </li>
            <li className="nav-item mb-0">
              <Link to={`/user/${userUid}`} className="nav-link text-white">Início</Link >
            </li>
            <li className="nav-item mb-0"> 
              <Link to={`stock`} className="nav-link text-white">Itens</Link >
            </li>
            <li className="nav-item mb-0" onClick={userSingOut}>
              <button className="nav-link text-white">
                Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}