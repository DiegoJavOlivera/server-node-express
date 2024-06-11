import {Router} from "express";
import productManager from "../manager/productManager.js";
import uploader from "../middleware/uploader.js";

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
  const idProduc = req.params.pid;
  const validate = manager.validateNumb(idProduc);
  if(validate.success === false){
    return res.status(400).send(validate.error)
  }
  const product = await manager.showProducts(validate.result);
  if(product === undefined) {
    return res.status(404).send("Product not found");
  }
  res.send(product);
})

router.post("/", uploader.single('image'),async(req,res)=>{
  console.log(req.file)
  console.log(req.body)
  res.send("prueba")

})


router.post("/", async(req,res)=>{
  const bodyProduct = req.body
  const newProduct = await manager.createProducts(bodyProduct);
  if(newProduct !== undefined){
    return res.status(400).send("Product not created");
  }
  res.status(201).send("Product created");
})

router.put("/:pid", async(req,res)=>{
  const idProduct = req.params.pid;
  const validate =  manager.validateNumb(idProduct);
  if(validate.success === false){
    return res.status(400).send(validate.error)
  }
  const putProduct = req.body;
  const updateProduct = await manager.updateProducts(validate.result, putProduct);
  if(updateProduct === undefined){
    return res.status(400).send("Product not updated");
  }
  res.status(200).send("Product update");
})

router.delete("/:pdi",async (req,res)=>{
  const idProduct = req.params.pdi;
  const validate = manager.validateNumb(idProduct);
  if(validate.success === false){
    return res.status(400).send(validate.error)
  }
  const deleteProduct = await manager.deleteProduct(validate);
  if(deleteProduct !== undefined){
    return res.status(400).send("Product not deleted");
  }
  res.status(200).send("Product deleted");
})


export default router;