import { Router } from "express";
import { addProductToCart, getCart, updateProductInCart } from "../controllers/cart.controllers.js";
import { isToken } from "../middlewares/isToken.js";

const cartRoutes = Router();

cartRoutes.get('/cart', isToken, getCart)
cartRoutes.post('/cart', isToken, addProductToCart)
cartRoutes.put('/cart/update', isToken, updateProductInCart)

export default cartRoutes;