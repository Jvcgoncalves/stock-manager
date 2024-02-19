import ProductInfo from "../../classes/ProductObeject";
import { auth } from "../firebaseAuth";

export const productService = {
  getProductData: async () =>{
    try {
      const authToken = await auth.currentUser.getIdToken()
      const productsFromUser = await fetch(`https://stock-manager-backend-sooty.vercel.app/users/`,{
        method:"GET",
        headers:{
          "authorization": `${authToken}`
        }
      }).then(async res => await res.json()).catch(e => e.message)
      return productsFromUser
    } catch (error) {
     return error.message 
    }
  },

  getSingleProductData: async id =>{
    try {
      const authToken = await auth.currentUser.getIdToken()
      
      const productFromUser = await fetch(`https://stock-manager-backend-sooty.vercel.app/users/${id}`,{
        method:"GET",
        headers:{
          "authorization": `${authToken}`
        }
      }).then(async res =>  await res.json()).catch(e => e)
      return productFromUser
    } catch (error) {
     return error.message 
    }
  },
  
  addProduct: async product =>{
    try {
      const authToken = await auth.currentUser.getIdToken()
      const productToAdd = JSON.stringify(new ProductInfo(product,auth.currentUser.uid).toObject())
      const response = await fetch(`https://stock-manager-backend-sooty.vercel.app/users/`,{
        method:"POST",
        headers:{
          "authorization": `${authToken}`,
          "Content-Type": "application/json"
        },
        body:productToAdd
        
      }).then(async res => await res.json()).catch(e => e)
      return response
    } catch (error) {
      return error.message
    }
  },

  deleteProduct: async productId =>{
    try {
      const authToken = await auth.currentUser.getIdToken()
      const response = await fetch(`https://stock-manager-backend-sooty.vercel.app/users/${productId}`,{
        method:"DELETE",
        headers:{
          "authorization": `${authToken}`,
        }
        
      }).then(async res => await res.json()).catch(e => {
        console.log(e);
        return e
      })
      return response
    } catch (error) {
      return error.message
    }
  },

  editProduct: async product =>{
    try {
      const authToken = await auth.currentUser.getIdToken()
      const productToUpdate = JSON.stringify({...product,userUid:auth.currentUser.uid})

      return await fetch(`https://stock-manager-backend-sooty.vercel.app/users/${123}`,{
        method:"PUT",
        headers:{
          "authorization": `${authToken}`,
          "Content-Type": "application/json"
        },
        body: productToUpdate
        
      }).then(async res => await res.json()).catch(e => e)
    } catch (error) {
      return error.message
    }
  }
}