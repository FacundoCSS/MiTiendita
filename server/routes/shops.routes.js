import { Router } from "express";
import { signup, signin, logout, updateShop, deleteShop, getShop, getShopByName } from "../controllers/shops.controllers.js";
import {verifyToken} from "../controllers/verify.controllers.js"

const router = Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/logout', logout);
router.get('/shop/:id', getShop);
router.get('/:name', getShopByName);
router.put('/shop/:id', verifyToken, updateShop);
router.delete('/user/:id', deleteShop);

export default router