import { Product } from "../models/product.js";

class ProductService {
    constructor() { }

    async findAll() {
        return Product.findAll()
    }
    async findOne(id) {
        return Product.findOne({ where: { id } })
    }
    async create(product, storeId) {
        console.log(product)
        return Product.create({
            name: product.name,
            storeId: storeId,
            description: product.description,
            brand: product.brand,
            price: product.price,
            category: product.category,
            stock: product.stock
        })
    }

    async update(id, product, storeId) {
        return Product.update({
            name: product.name,
            description: product.description,
            brand: product.brand,
            price: product.price,
            category: product.category,
            stock: product.stock
        }, { where: { id, storeId } })
    }
}

export default new ProductService()