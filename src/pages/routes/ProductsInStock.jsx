import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import UserId from "../../contexts/UserIdContext";

export function changeActiveNavLink(ev){
  const activePage = document.querySelector('.active')
  if(!activePage) ev.classList.add('active')
  else if(ev === activePage) return
  else {
    activePage.classList.remove('active')
    ev.classList.add('active')
  }
}

export default function ProductsInStock(){

  const userUid = useContext(UserId)

  return (
    <div className="container" >
      <h2 className="text-white h2">
        Itens em estoque
      </h2>
      <nav className="navbar line-below stock-navbar mb-1">
        <ul className="navbar-nav d-flex flex-row gap-3">
          <li className="nav-item ">
            <Link to={`/user/${userUid}/stock`} onClick={ev => changeActiveNavLink(ev.currentTarget)} className="nav-link text-white active">
              Todos os itens
            </Link>
          </li>
          <li className="nav-item ">
            <Link to={"addItem"} onClick={ev => changeActiveNavLink(ev.currentTarget)} className="nav-link text-white">
              Novos itens
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}