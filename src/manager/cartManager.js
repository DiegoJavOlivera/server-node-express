import fs from "fs";
import productManager from "../manager/productManager.js";
const manager = new productManager();

const PATH = "src/file/cart.json";

class CartManager {
  constructor() {
    this.init();
  }
  async init() {
    if (fs.existsSync(PATH)) {
      console.log("File cart exists");
    } else {
      try {
        await fs.promises.writeFile(PATH, JSON.stringify([]));
      } catch (error) {
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

  async saveProductsCart(productsCart) {
    try {
      await fs.promises.writeFile(
        PATH,
        JSON.stringify(productsCart, null, "\t"),
      );
    } catch (error) {
      console.log("Error writing productsCart", error);
      return false;
    }
  }

  async addProductCart({product}) {
    const newProductCart = {product};

    const dataProductCart = await this.getProductsCart();

    if (dataProductCart.length === 0) {
      newProductCart.id = 1;
    } else {
      newProductCart.id = dataProductCart[dataProductCart.length - 1].id + 1;
    }

    dataProductCart.push(newProductCart);

    await this.saveProductsCart(dataProductCart);
  }

  async showProductCart(id) {
    const productCart = await this.getProductsCart();
    const product = productCart.find((u) => u.id === id);

    return product;
  }

  async updateCart(idCart, idProduct, quantity) {
    const dataProductCart = await this.getProductsCart();
    const cartIndex = dataProductCart.findIndex((cid) => cid.id === idCart);
    if (cartIndex === -1){
      throw new Error("Cart index not found") 
    }
    const dataProductManager = await manager.getProducts();
    const product = dataProductManager.find((pid) => pid.id === idProduct);
    if (product === undefined) {
      return false;
    }
    const cart = dataProductCart[cartIndex]
    if(!Array.isArray(cart.product)){
      cart.product = [];
    }
    const existingProductIndex = cart.product.findIndex(p => p.productId === idProduct);
        if (existingProductIndex !== -1) {
            cart.product[existingProductIndex].quantity += 1;
        } else { cart.product.push({ productId: product.id, quantity })

    dataProductCart[cartIndex] = cart
    await this.saveProductsCart(dataProductCart);
    }
  }
}

export default CartManager;
