import { useState } from "react"
import Button from "../../../components/Button";
import { productService } from "../../../scripts/services/products-services";
import toggleLoader from "../../../scripts/hideLoader";

export default function AddProduct(){
  const {addProduct} = productService
  const [formData, setFormData] = useState({
    name:"",
    quantity:"",
    price:"",
    category:"",
    description:""
  })

  function handleChange(ev){
    const { id } = ev

    setFormData(state =>{
      return {...state,[id]: ev.value}
    })
  }

  return(
    <div className="add-product-page">
      <form 
        onSubmit={async ev => {
          ev.preventDefault()
          toggleLoader()
          const response = await addProduct(formData)

          if(response.message === "Failed to fetch") {
            alert("Erro interno não foi possível adicionar o produto")
            toggleLoader()
            return
          }
          setFormData({
            name:"",
            quantity:"",
            price:"",
            category:"",
            description:""
          })
          toggleLoader()
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
        <div className="w-100 d-flex justify-content-center">
          <Button 
          atributes={{
            type:"submit",
            className:"btn btn-info text-dark" 
          }}
          >
            Salvar
          </Button>
        </div>
      </form>
    </div>
  )
} 