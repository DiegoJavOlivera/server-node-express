import fs from "fs";

const PATH = "src/file/products.json";

class productManager {
  constructor() {
    this.init();
  }
  async init() {
    if (fs.existsSync(PATH)) {
      console.log("File exists");
    } else {
      try {
        await fs.promises.writeFile(PATH, JSON.stringify([]));
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    }
  }
  async getProducts() {
    try {
      const data = await fs.promises.readFile(PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  async saveProducts(products) {
    try {
      await fs.promises.writeFile(PATH, JSON.stringify(products, null, "\t"));
      return True;
    } catch (error) {
      console.log("Error writing products", error);
      return false;
    }
  }
  async createProducts({title, description, code, price, stock, category, thumbnails }) {
    const newProduct = {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    };
    if(!newProduct.stock){
      newProduct.stock = 1
    }
    newProduct.status = true;

    const products = await this.getProducts();
    
    if(products.length === 0) {
      newProduct.id = 1;
    } else {
      newProduct.id = products[products.length - 1].id + 1;
    }
    products.push(newProduct);

    await this.saveProducts(products);
  
  }
  async showProducts(id) {
    const products = await this.getProducts();
    const product = products.find(product => product.id === id);
    return product;
  }
  
  async updateProducts(id, productUpdate) {
    const products = await this.getProducts();
    const index = products.findIndex((prod) => prod.id === id);
    if (index === -1) throw new Error("Product not found");
    products[index] = { ...products[index], ...productUpdate };
    await this.saveProducts(products);
    return products[index];
  }
  async deleteProduct(id) {
    const products = await this.getProducts();
    const product = products.filter((prod) => prod.id !== id);
    if (product.length === products.length) throw Error("Product not found");
    await this.saveProducts(product);
  }
}


export default productManager;