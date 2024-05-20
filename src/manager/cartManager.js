import fs from "fs";


const PATH = "src/file/cart.json";

class CartManager{
  
  constructor(){
    this.init();
  }
  async init(){
    if (fs.existsSync(PATH)){
      console.log("File cart exists")
    } else {
      try {
        await fs.promises.writeFile(PATH, JSON.stringify([]));
      } catch (error){
        console.log(error);
        process.exit(1);
      }
    }
  }
  async getProductsCart() {
    try {
      const data = await fs.promises.readFile(PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
  
  async saveProductsCart(productsCart){
    try{
      await fs.promises.writeFile(PATH, JSON.stringify(productsCart, null, "\t"))
    } catch (error){
      console.log("Error writing productsCart", error);
      return false;
    }
  }
  
  async addProductCart({product}){
    const newProductCart = {
      product
    }
    for([key,value] of Object.entries(newProductCart)){
      if (value === undefined || value === null || value === ''){
        throw new Error(`Validation error: ${key} is required`);
      }
    }
    
    const dataProductCart = await this.getProductsCart();
    
    if (!dataProductCart.id){
      newProductCart.id = 1;  
    } else {
      newProductCart.id = newProductCart[dataProductCart.lenght - 1].id + 1;
    }
    
    dataProductCart.push(newProductCart);

    return console.log("Cart created");
  }

  
  async showProductCart(id){
    const productCart = await this.getProductsCart();
    const product = productCart.find((productCart) => productCart.id === id);
    if(product === undefined){
      throw new Error("Cart not found");
    }
    return product;
  }
}

export default CartManager;