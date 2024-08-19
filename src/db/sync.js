import { sequelize } from './connection.js';
import { createStatus, Status } from '../models/status.js';
import { Cart } from '../models/cart.js';
import { createProducts, Product } from '../models/product.js';
import { Sell } from '../models/sell.js';
import { createRelations } from './relations.js';
import { createTaxes } from '../models/tax.js';
import { createRoles, Role } from '../models/role.js';
import { createDiscounts } from '../models/discount.js';
import { createUsers } from '../models/user.js';
import { createStores } from '../models/store.js';
export const sync = async () => {
    await createRelations()
    await sequelize.sync({ force: false })

    // Descomentar para hacer seed 
    // await createRoles()
    // await createUsers()
    // await createStores()
    // await createStatus()
    // await createProducts()
    // await createTaxes()
    // await createDiscounts()
    console.log('All models were synchronized successfully.')
}