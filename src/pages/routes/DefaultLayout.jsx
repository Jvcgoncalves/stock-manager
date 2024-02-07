import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../../components/header";
import UserId from "../../contexts/UserIdContext";
import UserProducts from "../../contexts/userProducts";
import Loader from "../../components/common/Loader";
import { useState } from "react";

export default function DefaultLayout(){
  const {userUid,userInfo} = useLoaderData()
  const [allUserProducts,setAllUserProducts]= useState(userInfo.products)
  
  return(
    <UserId.Provider value={userUid}>
      <div id="App" className="bg-dark">
        <Header />
        <main className="container-fluid text-white">
          <UserProducts.Provider value={{allUserProducts,setAllUserProducts}}>
            {
              userInfo === null ? <Loader /> : <Outlet />
            }
          </UserProducts.Provider>
        </main>
      </div>
    </UserId.Provider>
  )
}