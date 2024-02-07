export default function showPassword(ev,input){
  const i_element = ev.currentTarget.children[0]
  
  if(i_element.classList[1] === "bi-eye" && input.type === "password"){
    i_element.classList.remove("bi-eye")
    i_element.classList.add("bi-eye-slash")
    input.type = "text"
  } else{
    i_element.classList.remove("bi-eye-slash")
    i_element.classList.add("bi-eye")
    input.type = "password"
  }
}