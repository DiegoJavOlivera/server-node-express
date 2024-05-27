import cartManager from "../manager/cartManager.js";
import productManager from "../manager/productManager.js";
import { Router } from "express";

const router = Router();

const managerPro = new productManager();
const managerCart = new cartManager();

router.get("/:cid", async(req,res)=>{
  const cartId = req.params.cid;
  const validate = managerPro.validateNumb(cartId);
  if (validate.success === false){
    return res.status(400).send(validate.error)
  }
  const productCart = await managerCart.showProductCart(validate.result);
  if(productCart === undefined){
    return res.status(404).send("Product Cart not found");
  }
  res.send(productCart)
})

router.post("/",async (req,res)=>{
  const productBody = req.body;
  const addProduct = await managerCart.addProductCart(productBody);
  if(addProduct !== undefined){
    return res.status(400).send("Product Cart not added");
  }
  res.status(201).send("Product Cart added");
})

router.post("/:cid/product/:pid",async (req,res)=>{
  const paramsCartId = req.params.cid;
  const validateCid = managerPro.validateNumb(paramsCartId);
  const paramsProducId = req.params.pid;
  const validatePid = managerPro.validateNumb(paramsProducId);
  if(validateCid.success === false || validatePid.success === false){
    return res.status(400).send(validateCid.error)
  }
  const {quantity} = req.body;
  const updateCart = await managerCart.updateCart(validateCid.result, validatePid.result,quantity)
  if(updateCart !== undefined){
    return res.status(400).send("Product Cart not updated");
  }
  res.status(200).send("Product Cart updated");
})



export default router;