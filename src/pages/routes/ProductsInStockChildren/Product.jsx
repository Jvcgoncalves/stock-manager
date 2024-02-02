import { useLoaderData } from "react-router-dom"

export default function Product(){

  const product = useLoaderData()
  console.log(product);

  if(document.querySelector('.active')){
    document.querySelector('.active').classList.remove("active")
  }

  return(
    <div>
      <h2>salve</h2>
    </div>
  )
}