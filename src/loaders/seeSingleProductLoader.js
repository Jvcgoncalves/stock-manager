import { doc, getDoc } from "firebase/firestore";
import { dataBase } from "../scripts/firebaseAuth";

export default async function seeSingleProductLoader({params}){

  const {userUid} = params 
    
  const currentUserUid = userUid
    
  const userRef = doc(dataBase,"users",currentUserUid)

  const products = await getDoc(userRef).then(res => res.data().products);

  const product = products.find(product => product.id === params.productId)

  if(!product){
    throw new Response("404 Not found", {status:404})
  }
  return product
}