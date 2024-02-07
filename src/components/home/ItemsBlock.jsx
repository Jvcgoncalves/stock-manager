import { Link } from "react-router-dom";

export default function ItemsBlock({name,productId}){
  return (
    <div className="row p-3">
      <span className="col-7">
        {name}
      </span>
      <div className="col-5">
        <Link
          to={`stock/product/${productId}`}
          className="btn btn-primary border-0 text-bg-light"
        >
          Ver
        </Link>
      </div>            
    </div>
  )
}