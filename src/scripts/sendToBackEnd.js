import ProductInfo from "../classes/ProductObeject";

export async function sendToBackEnd(data){
  try{
    const formatedData = new ProductInfo(data)
    fetch("http://localhost:3001/products",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formatedData),
    })
  } catch (e){
    console.log(e);
    return "error"
  }
}