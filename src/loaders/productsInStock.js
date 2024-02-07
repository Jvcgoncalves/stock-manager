import { doc, getDoc } from "firebase/firestore";
import { dataBase } from "../scripts/firebaseAuth";

export default async function productsInStock({params}){
  try {
    const {userUid} = params
    return userUid
  } catch (error) {
    throw new Error("Server error")
  }
}