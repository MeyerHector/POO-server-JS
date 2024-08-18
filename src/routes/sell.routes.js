import { Router } from "express";
import { createSell, getSell, getSells } from "../controllers/sell.controllers.js";

const sellRoutes = Router();

sellRoutes.get('/sells/:statusId', getSells)
sellRoutes.get('/sell/:sellId', getSell)
sellRoutes.post('/sell', createSell)

export default sellRoutes;