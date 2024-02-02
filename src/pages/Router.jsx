import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./routes/DefaultLayout";
import Home from "./routes/Home";
import homeLoader from "../loaders/homeLoader";
import ProductsInStock from "./routes/ProductsInStock";
import Home_ProductsInStock_boundary from "../error-bounderies/Home_ProductsInStock";
import productsInStock from "../loaders/productsInStock";
import AllItems from "./routes/ProductsInStockChildren/AllItems";
import AddProduct from "./routes/ProductsInStockChildren/AddProduct";
import Product from "./routes/ProductsInStockChildren/Product";
import seeSingleProductLoader from "../loaders/seeSingleProductLoader";

const routes = createBrowserRouter([
  {
    path:"/",
    element: <DefaultLayout />,
    children:[
      {
        index:true,
        element: <Home />,
        loader: homeLoader,
        errorElement: 
        <div className="container">
          <Home_ProductsInStock_boundary />
        </div>
      },
      {
        path:"/stock",
        element: <ProductsInStock />,
        
        children:[
          {
            index:true,
            element: <AllItems />,
            loader: productsInStock,
            errorElement: 
              <div className="container">
                <Home_ProductsInStock_boundary />
              </div>,
          },
          {
            path:"/stock/addItem",
            element: <AddProduct/ >
          },
          {
            path:"/stock/product/:productId",
            element: <Product />,
            loader: seeSingleProductLoader,
          }
        ]
      }
    ]
  }
])

export default routes