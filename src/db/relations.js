import { Cart } from "../models/cart.js"
import { Product } from "../models/product.js"
import { Sell } from "../models/sell.js"
import { Status } from "../models/status.js"
export const createRelations = async () => {
    try {
        Cart.belongsTo(Sell, { foreignKey: 'sellId' })
        Product.hasMany(Cart, { foreignKey: 'productId' })
        Cart.belongsTo(Product, { foreignKey: 'productId' })
        Sell.hasMany(Cart, { foreignKey: 'sellId' })
        Status.hasMany(Sell, { foreignKey: 'statusId' })
        Sell.belongsTo(Status, { foreignKey: 'statusId' })
        console.log('Relations created successfully')
    } catch (error) {
        console.error('Unable to create relations:', error);
    }
}   