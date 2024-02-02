export default async function removeFromBackEnd(id){
  await fetch(`http://localhost:3001/products/${id}`,{method:"DELETE"})
  return
}