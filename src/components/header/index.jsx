import { Link } from "react-router-dom";

export default function Header(){
  return(
    <header className="header mb-4">
      <div className="container d-flex justify-content-between container text-white align-items-center ">
        <h1 className="h2">
          Store Stock
        </h1>
        <nav className="navbar">
          <ul className="navbar-nav d-flex flex-row gap-3">
            <li className="nav-item">
              <Link className="nav-link text-white">Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white">Itens</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}