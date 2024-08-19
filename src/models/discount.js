import { DataTypes, sequelize } from "../db/connection.js";

export const Discount = sequelize.define('Discount', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('paymentMethod', 'cupon'),
        allowNull: false
    },
    cupon: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rate: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
})

export const createDiscounts = async () => {
    Discount.bulkCreate([
        { name: 'Pago en efectivo', type: 'paymentMethod', rate: 0.1 },
        { name: '5% OFF', type: 'cupon', cupon: '5off', rate: 0.05 },
        { name: '10% OFF', type: 'cupon', cupon: '10off', rate: 0.1 },
        { name: '15% OFF', type: 'cupon', cupon: '15off', rate: 0.15 },
        { name: '20% OFF', type: 'cupon', cupon: '20off', rate: 0.2 },
        { name: '30% OFF', type: 'cupon', cupon: '30off', rate: 0.3 },
    ])
    console.log('Discounts created successfully')
}