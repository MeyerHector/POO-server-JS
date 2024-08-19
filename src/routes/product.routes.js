import { Router } from "express";
import { createProduct, getProducts, updateProduct } from "../controllers/product.controllers.js";
import { isSeller } from "../middlewares/isSeller.js";

const productRoutes = Router();

productRoutes.get('/products', getProducts)
productRoutes.post('/product', isSeller, createProduct)
productRoutes.put('/product/:id', isSeller, updateProduct)

export default productRoutes;