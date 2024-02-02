import { Link, useLoaderData } from "react-router-dom"
import Button from "../../../components/Button";
import removeFromBackEnd from "../../../scripts/removeProduct";
import { useState } from "react";

export default function AllItems(){
  const allProductsDataBase = useLoaderData()
  const [allProducts,setAllProducts] = useState(allProductsDataBase)

  return(
    <div className="products-table d-flex flex-column">
      <div className="products-header px-3">
        <div className="row">
          <span className="col-3 p-3">
            ID
          </span>
          <span className="col-2 p-3">
            Nome
          </span>
          <span className="col-2 p-3">
            Em estoque
          </span>
          <span className="col-2 p-3">
            Categoria
          </span>
          <span className="col-3 p-3">
            Ações
          </span>
        </div>
      </div>
      <div className="products-body d-flex flex-column gap-3 px-3 mt-3">
        {
          allProducts.map(product=>{
            return(
                <div className="row" key={product.id}>
                  <span className="col-3">{product.id}</span>
                  <span className="col-2 ">{product.name}</span>
                  <span className="col-2">{product.quantity}</span>
                  <span className="col-2">{product.category}</span>
                  <div className="action-buttons d-flex gap-3 col-3">
                    <Link to={`/stock/product/${product.id}`}
                    className="btn btn-primary bg-info border-0 text-dark"
                    >
                      Ver
                    </Link>
                    <Link
                    className="btn btn-primary text-bg-light border-0"
                    >
                      Atualizar
                    </Link>
                    <Button
                    atributes={{
                      className:"btn btn-primary bg-danger border-0",
                      onClick:(() => {
                        removeFromBackEnd(product.id)
                        setAllProducts(allProducts.filter(currentProduct => currentProduct.id !== product.id))
                      })
                    }}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
            )
          })
        }
      </div>
    </div>
  )
}