import newId from "../scripts/createProductId"
import getCurrentDate from "../scripts/getProductRegisteDate"

export default class ProductInfo{
  constructor(data){
    this.name = data.name
    this.quantity = data.quantity
    this.price = data.price
    this.category =  this.getCategory(data.category)
    this.description = data.description
    this.id = newId()
    this.registe_date =  getCurrentDate(),
    this.upload_dates = []
  }

  getCategory(category){
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
}