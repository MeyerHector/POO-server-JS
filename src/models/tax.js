import { DataTypes, sequelize } from "../db/connection.js"

export const Tax = sequelize.define('Tax', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    rate: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    timestamps: false
})

export const createTaxes = async () => {
    await Tax.bulkCreate([
        { name: 'IVA', rate: 0.21 },
        { name: 'Demas impuestos...', rate: 0.1 }
    ])
    console.log('Taxes created successfully.')
}