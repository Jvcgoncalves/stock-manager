export default function newId(){
  const idLength = 18
  let newId = ''
  const possibleCaracters= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789" //78 

  for(let i = 0; i < idLength; i++){
    newId+= possibleCaracters[Math.floor(Math.random() * possibleCaracters.length)]

  }

  return newId
}