import { Link, useLoaderData, useNavigate } from "react-router-dom"
import Button from "../../../components/Button";
import {  useEffect, useRef, useState } from "react";
import getCategory from "../../../scripts/translateCategory";
import { productService } from "../../../scripts/services/products-services";
import toggleLoader from "../../../scripts/hideLoader";
import Loader from "../../../components/common/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../scripts/firebaseAuth";

export default function Product(){
  const {deleteProduct} = productService
  const {productId} = useLoaderData()
  const [product,setProduct] = useState(null) 
  const navigation = useNavigate()
  const fetchDataCalledRef = useRef(false)
  useEffect(()=>{
    if(document.querySelector('.active')){
      document.querySelector('.active').classList.remove("active")
    }
    const fetchData = () =>{
      onAuthStateChanged(auth,async user =>{
        if(!user){
          setProduct("user not allowed")
          return <h2>Nenhum usuário logado</h2>
        } else{
          const {getSingleProductData} = productService
          setProduct(await getSingleProductData(productId))
        }
      })
    }

    if (!fetchDataCalledRef.current) {
      fetchData();
      fetchDataCalledRef.current = true
    }
  },[])


  if(product === "product-not-found"){
    return <h2>Produto não encontrado!</h2>
  }
  if(product?.message){
    return <h2>Erro interno, tente novamente mais tarde</h2>
  }
  return(
    <div className="single-product-block">
      {
        product === null ?
        (
          <Loader />
        )
        :
        (
        <>
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
                  onClick:async () => {
                    toggleLoader()
                    const response = await deleteProduct(productId)
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
        </>
        )
      }
    </div>
  )
}