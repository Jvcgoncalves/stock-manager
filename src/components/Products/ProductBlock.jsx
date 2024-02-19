import { Link } from "react-router-dom"
import Button from "../Button"
import getCategory from "../../scripts/translateCategory"
import { productService } from "../../scripts/services/products-services"
import toggleLoader from "../../scripts/hideLoader"

export default function ProducBlock({id,name,quantity,category,setAllUserProducts,allUserProducts}){
  const {deleteProduct} = productService

  return(
    <div className="row" key={id}>
      <span className="col-3">{id}</span>
      <span className="col-2">{name}</span>
      <span className="col-2">{quantity}</span>
      <span className="col-1">{getCategory(category)}</span>
      <div className="action-buttons d-flex gap-3 col-auto ms-3">
        <Link to={`product/${id}`} 
        className="btn btn-primary bg-info border-0 text-dark"
        >
          Ver
        </Link>
        <Link
        to={`product/${id}/editProduct`}
        className="btn btn-primary text-bg-light border-0"
        >
          Atualizar
        </Link>
        <Button
        atributes={{
          className:"btn btn-primary bg-danger border-0",
          onClick:(async () => {
            toggleLoader()
            const response = await deleteProduct(id)
            if(response?.message === "Failed to fetch"){
              alert("Não foi possível remover o produto, tente novamente mais tarde")
              toggleLoader()
              return
            }
            if(response.error === "product-not-found"){
              alert("Produto não encontrado")
              toggleLoader()
              return
            }
            toggleLoader()
            setAllUserProducts(() => allUserProducts.filter(product => product.id !== id))
          })
        }}
        >
          Excluir
        </Button>
      </div>
    </div>
  )
}

// const filterProducts = allUserProducts.filter(currentProduct => currentid !== id)
// setAllUserProducts(filterProducts)
