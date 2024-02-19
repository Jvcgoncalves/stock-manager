import { useEffect, useRef, useState } from "react";
import DashboardBoxes from "../../components/home/DashboardBoxes";
import ItemsBlock from "../../components/home/ItemsBlock";
import { useLoaderData } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../scripts/firebaseAuth";
import { productService } from "../../scripts/services/products-services";

export default function Home(){
  const {productsRelationsFunction} = useLoaderData()
  const [productsRelations,setProductsRelations] = useState(null)
  const fetchDataCalledRef = useRef(false);
  
  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          return;
        } else {
          const { getProductData } = productService;
          const userProducts = await getProductData();
          if(userProducts === "Failed to fetch"){
            setProductsRelations(userProducts)
            return
          }

          if(userProducts?.message === "User not allowed"){
            setProductsRelations(userProducts.message)
            return
          }

          const newProductsRelations = {
            endingProducts: productsRelationsFunction.getEndingProducts(userProducts),
            kindsProducts: productsRelationsFunction.allKindsProducts(userProducts),
            productsQuantity: productsRelationsFunction.allProductsQuantity(userProducts),
            recentProducts: productsRelationsFunction.getRecentProducts(userProducts)
          };
          setProductsRelations(newProductsRelations);
        }
      });
    };
    if (!fetchDataCalledRef.current) {
      fetchData();
      fetchDataCalledRef.current = true
    }
  }, []);

  if(productsRelations === "Failed to fetch"){
    return <div className="container"><h2>Problemas internos no servidor</h2></div>
  }

  if(productsRelations === "User not allowed"){
    return <div className="container"><h2>Não autorizado!, faça seu login novamente</h2></div>
  }

  return (
    <div className="container">
      <h2 className="display-4">
        Dashboard
      </h2>
      {
        productsRelations === null ? 
        (
          <Loader />
        )
        :
        (
          <>
            <DashboardBoxes 
            endingProducts={productsRelations.endingProducts}
            kindsProducts={productsRelations.kindsProducts}
            productsQuantity={productsRelations.productsQuantity}
            recentProducts={productsRelations.recentProducts}
            />
            <div className="d-flex gap-3 products-info">
              <div className="w-50 recent-block">
                <div className="itens-actions">
                  <div className="row p-3">
                    <span className="col-7">
                      Itens recentes
                    </span>            
                    <span className="col-5 ">
                      Ações
                    </span>
                  </div> {/* .row end*/}
                </div> {/* .itens-actions end*/}
                <div className="products">
                  {
                    productsRelations.recentProducts.length === 0 ?
                    <span className="fs-5">
                      Não há produtos recentes
                    </span>
                    : 
                    (
                      productsRelations.recentProducts.map(product => {
                        return (
                          <ItemsBlock name={product.name} key={product.id} productId={product.id}/>
                        )
                      })
                    )
                  }
                </div> {/* .products end*/}
              </div> {/* .recent-block end*/}
        
              <div className="w-50 end-block">
                <div className="itens-actions">
                  <div className="row p-3">
                      <span className="col-7">
                        Itens acabando
                      </span>            
                      <span className="col-5">
                        Ações
                      </span>
                    </div> {/* .row end*/}
                  </div> {/* .itens-actions end*/}
                <div className="products">
                  {
                    productsRelations.endingProducts.length === 0 ?
                    <span className="fs-5">
                      Não há produtos acabando
                    </span>
                    : 
                    (
                      productsRelations.endingProducts.map(product => {
                        return (
                          <ItemsBlock name={product.name} key={product.id} productId={product.id}/>
                        )
                      })
                    )
                  }
                </div> {/* .products end*/}
              </div> {/* .end-block end*/}
            </div>
          </>
          
        )
      }
    </div>

  )
}