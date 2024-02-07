import { doc, getDoc, updateDoc } from "firebase/firestore";
import ProductInfo from "../classes/ProductObeject";
import { auth, dataBase } from "./firebaseAuth";

export async function sendToBackEnd(data,setAllUserProducts){
  try{
    const currentUser = auth.currentUser

    const userRef = doc(dataBase,"users",currentUser.uid)

    const userDoc = await getDoc(userRef);

    const currentProducts = userDoc.data().products || [];
    const formatedData = new ProductInfo(data,currentUser.uid)
    currentProducts.push(formatedData.toObject());
    await updateDoc(userRef, { products: currentProducts });
    
    setAllUserProducts(currentProducts)
  } catch (e){
    console.log(e);
    return "error"
  }
}