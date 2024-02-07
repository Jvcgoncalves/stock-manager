import { Link, useLoaderData, useNavigate } from "react-router-dom"
import Button from "../../../components/Button";
import removeFromBackEnd from "../../../scripts/removeProduct";
import UserProducts from "../../../contexts/userProducts";
import { useContext, useEffect } from "react";
import getCategory from "../../../scripts/translateCategory";

export default function Product(){

  const {allUserProducts,setAllUserProducts} = useContext(UserProducts)
  const product = useLoaderData()
  const navigation = useNavigate()

  useEffect(()=>{
    if(document.querySelector('.active')){
      document.querySelector('.active').classList.remove("active")
    }
  },[])


  return(
    <div className="single-product-block">
      <div className="product-header d-flex align-items-center gap-3 flex-wrap">
        <h3 className="h1">
          {product.name}
        </h3>
        <div className="product-header-buttons d-flex gap-3">
          <Link
          to={`editProduct`}
          className="btn btn-primary text-bg-light border-0">
            Atualizar
          </Link>
          <Button atributes={
            {
              className:"btn btn-primary bg-danger border-0",
              onClick:() => {
                const filterProducts = allUserProducts.filter(currentProduct => currentProduct.id !== product.id)
                removeFromBackEnd(filterProducts)
                setAllUserProducts(filterProducts)
                navigation(-1)
              }
            }
          }
          >
            Excluir
          </Button>
        </div>
      </div>
      <div className="product-body">
        <ul className="my-4 d-flex flex-row gap-3 rounded-0 list-group basic-product-info">
          <li className="list-group-item text-white border-0 fs-5 dark-background-black">
            Categoria: {getCategory(product.category)}</li>
          <li className="list-group-item text-white border-0 fs-5 dark-background-black">Quantidade em estoque: {product.quantity}</li>
          <li className="list-group-item text-white border-0 fs-5 dark-background-black">Preço {(+product.price).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</li>
        </ul>

        <h4 className="h3 mb-0">Descrição do produto</h4>
        <p className="fs-5 mb-4">{product.description}</p>

        <ul className="list-group register-update-info">
          <li className="list-group-item border-0 bg-transparent text-white ps-0">Cadastrado em: {product.register_date}</li>
          <li className="list-group-item border-0 bg-transparent text-white ps-0">Atualizado em: {product.last_update}</li>
        </ul>
      </div>
    </div>
  )
}