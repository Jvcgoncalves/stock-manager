import { Link } from "react-router-dom"
import Button from "../../../components/Button";
import removeFromBackEnd from "../../../scripts/removeProduct";
import { useContext} from "react";
import UserProducts from "../../../contexts/userProducts";
import getCategory from "../../../scripts/translateCategory";

export default function AllItems(){
  const {allUserProducts,setAllUserProducts} = useContext(UserProducts)

  return(
    <div className="products-table d-flex flex-column mt-4">
      <div className="products-header px-3 dark-background-black">
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
          <span className="col-1 p-3">
            Categoria
          </span>
          <span className="col-auto ms-3 p-3">
            Ações
          </span>
        </div>
      </div>
      <div className="products-body d-flex flex-column gap-3 px-3 mt-3">
        {
          allUserProducts.length === 0 ?
          (
            <span className="fs-5 text-center">
              Não há produtos no estoque
            </span>
          )
          :
          (
            allUserProducts.map(product=>{
              return(
                <div className="row" key={product.id}>
                  <span className="col-3">{product.id}</span>
                  <span className="col-2">{product.name}</span>
                  <span className="col-2">{product.quantity}</span>
                  <span className="col-1">{getCategory(product.category)}</span>
                  <div className="action-buttons d-flex gap-3 col-auto ms-3">
                    <Link to={`product/${product.id}`} 
                    className="btn btn-primary bg-info border-0 text-dark"
                    >
                      Ver
                    </Link>
                    <Link
                    to={`product/${product.id}/editProduct`}
                    className="btn btn-primary text-bg-light border-0"
                    >
                      Atualizar
                    </Link>
                    <Button
                    atributes={{
                      className:"btn btn-primary bg-danger border-0",
                      onClick:(() => {
                        const filterProducts = allUserProducts.filter(currentProduct => currentProduct.id !== product.id)
                        removeFromBackEnd(filterProducts)
                        setAllUserProducts(filterProducts)
                      })
                    }}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              )
            })
          )
        }
      </div>
    </div>
  )
}