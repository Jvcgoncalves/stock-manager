import newId from "../scripts/createProductId"
import getCurrentDate from "../scripts/getProductRegisteDate"

export default class ProductInfo{
  constructor(data,userUid){
    this.name = data.name  
    this.quantity = data.quantity
    this.price = data.price
    this.category =  data.category
    this.description = data.description
    this.id = newId()
    this.register_date =  getCurrentDate(),
    this.last_update = "--/--/----"
    this.userUid = userUid
  }

  toObject() {
    return {
      name: this.name,
      quantity: this.quantity,
      price: this.price,
      category: this.category,
      description: this.description,
      id: this.id,
      register_date: this.register_date,
      last_update: this.last_update,
      userUid: this.userUid,
    };
  }
}