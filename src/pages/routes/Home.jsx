import DashboardBoxes from "../../components/home/DashboardBoxes";
import ItemsBlock from "../../components/home/ItemsBlock";
import { useLoaderData } from "react-router-dom";

export default function Home(){
  const {productsRelations} = useLoaderData() // return the userUid and some information about current stock

  return (
    <div className="container">
      <h2 className="display-4">
        Dashboard
      </h2>
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
    </div>

  )
}