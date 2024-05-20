import cartManager from "../manager/cartManager.js";
import productManager from "../manager/productManager.js";
import { Router } from "express";

const router = Router();

const managerPro = new productManager();
const managerCart = new cartManager();

router.get("/:cid", async(req,res)=>{
  const cartId = req.params.cid;
  cartId = parseInt(cartId);
  const productCart = await managerCart.showProductCart(cartId);
  if(productCart !== undefined){
    res.status(404).send("Product Cart not found");
  }
  res.send(productCart)
})

router.post("/",async (req,res)=>{
  const productBody = req.body;
  const addProduct = await managerCart.addProductCart(productBody);
  if(addProduct !== undefined){
    res.status(400).send("Product Cart not added");
  }
  res.status(201).send("Product Cart added");
})

router.post("/:cid/product/:pid",async (req,res)=>{
  const cartId = req.params.cid;
  cartId = parseInt(cartId);
  const productId = req.params.pid;
  productId = parseInt(productId);
  const quantityProduct = req.body.quantity;
  const objectIdCartManager = await managerCart.showProductCart(cartId);
  const idProductManager = await managerPro.showProducts(productId);
  if(idProductManager === undefined){
    res.status(404).send("Product not found");
  }
  if(objectIdCartManager === undefined){
    res.status(404).send("Cart not found");
  }
  if (!objectIdCartManager.product.quantity){
    objectIdCartManager.product.quantity = 1;
  }
  else {
    objectIdCartManager.product.quantity = objectIdCartManager.product.quantity + quantityProduct;
  }
  
  
  objectIdCartManager.product.push(idProductManager.id, objectIdCartManager.product.quantity);
  
  res.render(objectIdCartManager)
})

export default router;