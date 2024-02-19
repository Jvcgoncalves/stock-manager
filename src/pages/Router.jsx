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
import Login from "./routes/Login";
import SingUp from "./routes/SingUp";
import userSingInIdLoader from "../loaders/userSingInLoader";
import DefaultLayoutBondarie from "../error-bounderies/DefaultLayoutError";
import SingleProductBoundary from "../error-bounderies/SingleProductBoundary";
import EditProduct from "./routes/ProductsInStockChildren/EditProduct";

const routes = createBrowserRouter([
  {
    path: "*",
    element: <Login />,
  },
  {
    path:"/",
    element: <Login />,
    index:true,
  },
  {
    path:"/singUp",
    element: <SingUp />,
  },
  {
    
    path:"/user/:userUid",
    element: <DefaultLayout />,
    loader: userSingInIdLoader,
    errorElement: 
    <div id="App" className="bg-dark">
      <main className="container-fluid">
        <div className="container text-white">
          <DefaultLayoutBondarie /> 
        </div>
      </main>
    </div>
    ,
    children:[
      {
        index:true,
        element: <Home />,
        loader: homeLoader,
        errorElement: 
        <div className="container">
          <Home_ProductsInStock_boundary />
        </div>,
      }, // home
      {
        path:"/user/:userUid/product/:productId",
        element:
        <div className="container">
          <Product />
        </div>,
        loader: seeSingleProductLoader
      },
      {
        path:"/user/:userUid/stock",
        element: <ProductsInStock />,
        errorElement:
        <div className="container">
          <Home_ProductsInStock_boundary />
        </div>, 
        children:[
          {
            index:true,
            element: <AllItems />,
            loader:productsInStock,
            errorElement: 
              <div className="container">
                <Home_ProductsInStock_boundary />
              </div>, // allProducts
          },
          {
            path:"/user/:userUid/stock/addItem",
            element: <AddProduct />
          },
          {
            path:"/user/:userUid/stock/product/:productId",
            element: <Product />,
            loader: seeSingleProductLoader,
            errorElement: <SingleProductBoundary />
          },
          {
            path:"/user/:userUid/stock/product/:productId/editProduct",
            element: <EditProduct />,
            loader: seeSingleProductLoader,
            errorElement: <SingleProductBoundary />
          }
        ]
      } // products in stock path
    ] // initial path
  }
])

export default routes