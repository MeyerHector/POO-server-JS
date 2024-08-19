import { Cart } from "../models/cart.js"
import { Product } from "../models/product.js"
import { Role } from "../models/role.js"
import { Sell } from "../models/sell.js"
import { Status } from "../models/status.js"
import { Store } from "../models/store.js"
import { User } from "../models/user.js"
export const createRelations = async () => {
    try {
        Cart.belongsTo(Sell, { foreignKey: 'sellId' })
        Product.hasMany(Cart, { foreignKey: 'productId' })
        Cart.belongsTo(Product, { foreignKey: 'productId' })
        Sell.hasMany(Cart, { foreignKey: 'sellId' })
        Status.hasMany(Sell, { foreignKey: 'statusId' })
        Sell.belongsTo(Status, { foreignKey: 'statusId' })
        User.hasOne(Store, { foreignKey: 'userId' })
        Store.hasMany(Product, {
            foreignKey: 'storeId'
        })
        Product.belongsTo(Store, {
            foreignKey: 'storeId'
        })
        Role.hasMany(User, {
            foreignKey: 'roleId',
        });
        User.belongsTo(Role, {
            foreignKey: 'roleId'
        });
        console.log('Relations created successfully')
    } catch (error) {
        console.error('Unable to create relations:', error);
    }
}   