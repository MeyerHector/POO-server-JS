import { Router } from "express";
import { cancelSell, createSell, getSell, getSells, paySell, setPaymentMethod } from "../controllers/sell.controllers.js";

const sellRoutes = Router();

sellRoutes.get('/sells/:statusId', getSells)
sellRoutes.get('/sell/:sellId', getSell)
sellRoutes.post('/sell', createSell)
sellRoutes.patch('/set-payment-method/:sellId', setPaymentMethod)
sellRoutes.patch('/pay/:sellId', paySell)
sellRoutes.patch('/cancel-sell/:sellId', cancelSell)
export default sellRoutes;