import { doc, getDoc } from "firebase/firestore";
import {  dataBase } from "../scripts/firebaseAuth";

export default async function userSingInIdLoader({params}){
  try {
    const {userUid} = params 
    
    const currentUserUid = userUid
      
    const userRef = doc(dataBase,"users",currentUserUid)
  
    const userDoc = await getDoc(userRef).then(res => res.data());
    return {userUid,userInfo:userDoc}
  } catch (error) {
    throw new Error("server problems")
  }
}