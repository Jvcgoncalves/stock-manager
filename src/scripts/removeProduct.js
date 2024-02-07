import { doc, updateDoc } from "firebase/firestore";
import { auth, dataBase } from "./firebaseAuth";

export default async function removeFromBackEnd(products){
  try {
    const currentUser = doc(dataBase,"users",auth.currentUser.uid)
    await updateDoc(currentUser, { products: products });
  } catch (error) {
    console.log(error);
  }
}