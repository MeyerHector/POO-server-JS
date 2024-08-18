import { sequelize } from './connection.js';
import { createStatus, Status } from '../models/status.js';
import { Cart } from '../models/cart.js';
import { createProducts, Product } from '../models/product.js';
import { Sell } from '../models/sell.js';
import { createRelations } from './relations.js';
import { createTaxes } from '../models/tax.js';
import { createRoles, Role } from '../models/role.js';
export const sync = async () => {
    await createRelations()
    await sequelize.sync({ force: false })

    // Descomentar para hacer seed 
    // await createProducts()
    // await createTaxes()
    // await createRoles()
    // await createStatus()
    console.log('All models were synchronized successfully.')
}