import cartManager from "../manager/cartManager.js";
import productManager from "../manager/productManager.js";
import { Router } from "express";

const router = Router();

const managerPro = new productManager();
const managerCart = new cartManager();

router.get("/:cid", async(req,res)=>{
  const cartId = parseInt(req.params.cid);

  const productCart = await managerCart.showProductCart(cartId);
  if(productCart === undefined){
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
  const paramsCartId = parseInt(req.params.cid);
  const paramsProducId = parseInt(req.params.pid);
  const {quantity} = req.body;
  const updateCart = await managerCart.updateCart(paramsCartId, paramsProducId,quantity)
  if(updateCart !== undefined){
    res.status(400).send("Product Cart not updated");
  }
  res.status(200).send("Product Cart updated");
})



export default router;