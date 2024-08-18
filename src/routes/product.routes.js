import { Router } from "express";
import { createProduct, getProducts, updateProduct } from "../controllers/product.controllers.js";

const productRoutes = Router();

productRoutes.get('/products', getProducts)
productRoutes.post('/product', createProduct)
productRoutes.put('/product/:id', updateProduct)

export default productRoutes;