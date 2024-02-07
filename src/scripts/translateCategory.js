export default function getCategory(category){
  switch(category){
    case "Games":
      return "Jogos"
    case "Food":
      return "Comida"
    case "Drinks":
      return "Bebidas"
    case "Vehicle":
      return "Veiculos"
    case "SelfCare":
      return "Cuidados pessoais"
    case "Other":
      return "Outro"
    default:
      undefined
  }
}