import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, dataBase } from "./firebaseAuth";
import getCurrentDate from "./getProductRegisteDate";

export async function updateProductFromBackEnd(data,setAllUserProducts){
  try{
    const currentUserUid = auth.currentUser.uid
    const userRef = doc(dataBase,"users",currentUserUid)

    const userDoc = await getDoc(userRef);

    const currentProducts = userDoc.data().products || [];
    const formatedData = {...data, last_update:getCurrentDate()}
    const newProductsArray = currentProducts.map(product=>{
      if(product.id === data.id) return { ...product,...formatedData}
      else return product
    })

    await updateDoc(userRef, { products: newProductsArray }); // update the backend
    
    setAllUserProducts(newProductsArray) // update the state with the products
  } catch {
    throw new Error("Não foi possível completar a ação")
  }
}