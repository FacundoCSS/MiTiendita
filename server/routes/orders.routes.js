import { Router } from "express";
import { addOrder, cancelOrder, getOrder, getOrders, updateOrder } from "../controllers/orders.controllers.js";
const router = Router();

router.get('/order/:id', getOrder)
router.get('/orders/:id', getOrders)
router.post('/order', addOrder);
router.put('/order/:id', updateOrder);
router.delete('/order/:id', cancelOrder);

export default router