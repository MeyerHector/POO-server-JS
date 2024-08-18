import { Router } from "express";
import { addProductToCart, getCart, updateProductInCart } from "../controllers/cart.controllers.js";

const cartRoutes = Router();

cartRoutes.get('/cart', getCart)
cartRoutes.post('/cart', addProductToCart)
cartRoutes.put('/cart/update', updateProductInCart)

export default cartRoutes;