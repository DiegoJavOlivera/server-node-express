import {Router} from "express";
import productManager from "../manager/productManager.js";

const router = Router();

const manager = new productManager();

router.get("/",async (req,res)=>{
  const products = await manager.getProducts();
  if (products.length === 0){
    return res.status(404).send("No products found");
  }
  

  res.send(products);
})

router.get("/:pid",async (req,res) =>{
  const idProduc = parseInt(req.params.pid);
  const product = await manager.showProducts(idProduc);
  if(product === undefined) {
    return res.status(404).send("Product not found");
  }
  res.send(product);
})

router.post("/", async(req,res)=>{
  const newProduct = await manager.createProducts(req.body);
  if(newProduct !== undefined){
    return res.status(400).send("Product not created");
  }
  res.status(201).send("Product created");
})

router.put("/:pid", async(req,res)=>{
  const idProduct = parseInt(req.params.pid);
 
  const putProduct = req.body;
  const updateProduct = await manager.updateProducts(idProduct, putProduct);
  if(updateProduct === undefined){
    return res.status(400).send("Product not updated");
  }
  res.status(200).send("Product update");
})

router.delete("/:pdi",async (req,res)=>{
  const idProduct = parseInt(req.params.pdi);
  const deleteProduct = await manager.deleteProduct(idProduct);
  if(deleteProduct !== undefined){
    return res.status(400).send("Product not deleted");
  }
  res.status(200).send("Product deleted");
})


export default router;