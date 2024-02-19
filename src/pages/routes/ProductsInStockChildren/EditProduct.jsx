import {  useEffect, useState } from "react"
import Button from "../../../components/Button";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { productService } from "../../../scripts/services/products-services";
import toggleLoader from "../../../scripts/hideLoader";
import Loader from "../../../components/common/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../scripts/firebaseAuth";

export default function EditProduct(){
  const {editProduct} = productService
  const {productId} = useLoaderData()
  const [product,setProduct] = useState(null)
  const navigation = useNavigate()
  const [formData, setFormData] = useState(null)
  useEffect(()=>{
    if(document.querySelector('.active')){
      document.querySelector('.active').classList.remove("active")
    }
  },[])

  if(product === null){
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

  if(product !== null && formData === null){
    setFormData({
      name:product?.name ?? "",
      quantity:product?.quantity ?? "",
      price:product?.price ?? "",
      category:product?.category ?? "",
      register_date:product?.register_date ?? "",
      description:product?.description ?? "",
      id: product?.id ?? ""
    })
  }
  

  function handleChange(ev){
    const { id } = ev

    setFormData(state =>{
      return {...state,[id]: ev.value}
    })
  }

  if(product === "product-not-found"){
    return <h2>Produto não encontrado!</h2>
  }

  return(
    <div className="add-product-page">
      {
        formData === null ? 
        (
          <Loader />
        )
        :
        (
          <>
            <form 
            onSubmit={async ev => {
            ev.preventDefault()
            toggleLoader()
            const response = await editProduct(formData)
            if(response.message === "Failed to fetch") {
              alert("Não foi possível editar o produto tente novamente mais tarde")
              toggleLoader()
              return
            }
            toggleLoader()
            navigation(-1)
            }}
            >
              <div className="row my-2">
                <div className="col-3">
                  <label className="fs-5 form-label" htmlFor="name">Nome</label>
                  <input
                    autoComplete="off"
                    value={formData.name} 
                    onChange={ev => handleChange(ev.currentTarget)} 
                    required
                    id="name" 
                    type="text"
                    className="form-control text-white" 
                  />
                </div> {/* Name div end */}
                <div className="col-3">
                  <label className="fs-5 form-label" htmlFor="quantity">Quantidade</label>
                  <input
                    min={0}
                    autoComplete="off"
                    value={formData.quantity} 
                    onChange={ev => handleChange(ev.currentTarget)} 
                    required
                    id="quantity" 
                    type="number"
                    className="form-control text-white" 
                  />
                </div> {/* Quantity div end */}
                <div className="col-3">
                  <label className="fs-5 form-label" htmlFor="price">Preço</label>
                  <input
                    autoComplete="off"
                    min={0}
                    value={formData.price} 
                    onChange={ev => handleChange(ev.currentTarget)} 
                    required
                    id="price" 
                    type="number"
                    step="0.01"
                    className="form-control text-white" 
                  />
                </div> {/* Price div end */}
                <div className="col-3">
                  <label className="fs-5 form-label" htmlFor="category">Categoria</label>
                  <select 
                    value={formData.category} 
                    onChange={ev => handleChange(ev.currentTarget)} 
                    required
                    id="category" 
                    type="text"
                    className="form-select text-white" 
                  >
                    <option value="" disabled>
                      Escolha uma categoria
                    </option>
                    <option value="Games">Jogos</option>
                    <option value="Food">Comida</option>
                    <option value="Drinks">Bebida</option>
                    <option value="Vehicle">Veículos</option>
                    <option value="SelfCare">Cuidados pessoais</option>
                    <option value="Other">Outro</option>
                  </select> {/* Select for categories */}
                </div> {/* Select div end */}
              </div>
              <div className="row my-2">
                <div className="col-12">
                  <label className="fs-5 form-label" htmlFor="description">Descrição</label>
                  <textarea 
                    onChange={ev => handleChange(ev.currentTarget)} 
                    required
                    value={formData.description} 
                    id="description" 
                    className="form-control text-white w-100 p-1" 
                    rows="8"
                  >
                  </textarea>
                </div>
              </div> {/* text area row end */}
              <div className="w-100 d-flex gap-3 align-items-center justify-content-center">
                <Button 
                  atributes={{
                  type:"submit",
                  className:"btn btn-info text-dark" 
                  }}
                >
                  Salvar
                </Button>
                <Link
                  to={-1}
                  className="btn btn-info text-dark"
                >
                  Cancelar
                </Link>
              </div>
            </form>
          </>
        )
      }
    </div>
  )
} 