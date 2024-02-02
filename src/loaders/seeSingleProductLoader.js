export default async function seeSingleProductLoader({params}){
  const dataBase = await await fetch('http://localhost:3001/products').then(res => res.json())
  const product = dataBase.filter(product => product.id === params.productId)
  if(!product){
    
  }
  return product
}