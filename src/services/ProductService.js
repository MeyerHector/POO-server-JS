import { Product } from "../models/product.js";

class ProductService {
    constructor() { }

    async findAll() {
        return Product.findAll()
    }
    async findOne(id) {
        return Product.findOne({ where: { id } })
    }
    async create(product) {
        return Product.create(product)
    }

    async update(id, product) {
        return Product.update(product, { where: { id } })
    }
}

export default new ProductService()