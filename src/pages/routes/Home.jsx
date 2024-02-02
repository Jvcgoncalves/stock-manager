import { useLoaderData } from "react-router-dom";
import DashboardBoxes from "../../components/home/DashboardBoxes";
import ItemsBlock from "../../components/home/ItemsBlock";

export default function Home(){

  const dataBase = useLoaderData()

  return (
    <div className="container">
      <h2 className="display-4">
        Dashboard
      </h2>
      <DashboardBoxes />
      <div className="d-flex gap-3">
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
              dataBase.map(product => {
                return (
                  <ItemsBlock name={product.name} key={product.id} />
                )
              })
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
            
          </div> {/* .products end*/}
        </div> {/* .end-block end*/}

        
      </div>
    </div>

  )
}