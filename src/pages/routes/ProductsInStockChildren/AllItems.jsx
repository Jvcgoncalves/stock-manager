import { useEffect, useRef, useState} from "react";
import ProducBlock from "../../../components/Products/ProductBlock";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../scripts/firebaseAuth";
import { productService } from "../../../scripts/services/products-services";
import Loader from "../../../components/common/Loader";

export default function AllItems(){
  const [allUserProducts,setAllUserProducts] = useState(null)
  const fetchDataCalledRef = useRef(false)
  
  useEffect(() => {
    const fetchData = async () =>{
      onAuthStateChanged(auth,async user =>{
        if(!user){
          setAllUserProducts("error")
          return <h2>Nenhum usuário logado</h2>
        } else{
          const {getProductData} = productService
          setAllUserProducts(await getProductData())
        }
      })
    }
    
    if (!fetchDataCalledRef.current) {
      fetchData();
      fetchDataCalledRef.current = true
    }
  }, []);

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
          allUserProducts === null ?
          (
            <Loader />
          )
          :
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
                <ProducBlock 
                category={product.category}
                id={product.id}
                name={product.name}
                quantity={product.quantity}
                key={product.id}
                setAllUserProducts={setAllUserProducts}
                allUserProducts={allUserProducts}
                />
              )
            })
          )
        }
      </div>
    </div>
  )
}