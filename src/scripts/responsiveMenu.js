export default function toggleMenu(ev){
  const navbar = document.querySelector('.navbar')
  const button = document.querySelector('.menu-hamburguer').children[0]
  navbar.classList.toggle("active")
  if(button.classList.contains('bi-list')){
    button.classList.replace("bi-list","bi-x-lg")
  } else if(button.classList.contains('bi-x-lg')){
    button.classList.replace("bi-x-lg","bi-list")
  }
  // bi-list bi-x-lg
}