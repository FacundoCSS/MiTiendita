import { Router } from "express";
import { getProduct, getProducts, addProduct, updateProduct, deleteProduct } from "../controllers/products.controllers.js";
import {verifyToken} from "../controllers/verify.controllers.js"
const router = Router();

router.get('/product/:id', getProduct);
router.get('/products/:id', getProducts)
router.post('/new', verifyToken, addProduct);
router.put('/product/:id', verifyToken, updateProduct);
router.delete('/product/:id', verifyToken, deleteProduct);


export default router