export default async function homeLoader(){
  const response = await fetch('http://localhost:3001/products').then(res => res.json())

  if(!localStorage.getItem("userDataBase")) console.log(response);

  return response
}