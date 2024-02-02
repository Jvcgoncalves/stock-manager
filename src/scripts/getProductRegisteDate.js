export default function getCurrentDate(){
  const date = new Date()
  const day = date.getDay() < 10 ? `0${date.getDay()}` : `${date.getDay()}`
  const month = date.getMonth() + 1 < 9 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`

  return `${day}/${month}/${date.getFullYear()}`
}