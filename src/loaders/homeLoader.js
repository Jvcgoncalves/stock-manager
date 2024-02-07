import { doc, getDoc } from "firebase/firestore";
import { dataBase } from "../scripts/firebaseAuth";
import getCurrentDate from "../scripts/getProductRegisteDate";

export default async function homeLoader({params}){
  try {
    let {userUid} = params ?? "no user"

    const userRef = doc(dataBase,"users",userUid)

    const userDoc = await getDoc(userRef);

    const currentProducts = userDoc.data().products || [];
    const productsRelations ={
      endingProducts:getEndingProducts(currentProducts),
      recentProducts:getRecentProducts(currentProducts),
      kindsProducts:allKindsProducts(currentProducts),
      productsQuantity:allProductsQuantity(currentProducts)
    }
    return {userUid, productsRelations}
  } catch (error) {
    throw new Error("Server error")
  }
}

function getEndingProducts(products){
  return products.filter(product=>product.quantity <=10)
}
//product.register_date.split('/')
function getRecentProducts(products){
  return products.filter(product=>{
    const [currentDay,currentMonth,currentYear] = getCurrentDate().split("/")
    const [registerDay,registerMonth,registerYear] = product.register_date.split("/")

    if(currentYear-registerYear !== 0) return
    else if(currentMonth - registerMonth > 1 || currentMonth-registerMonth < 0) return
    else if(currentDay > registerDay && currentMonth !== registerMonth) return
    else return product
  })
}

function allKindsProducts(products){
  return products.length
}

function allProductsQuantity(products){
  return products.reduce((finalSum,currentProduct)=> finalSum += +currentProduct.quantity, 0)
}