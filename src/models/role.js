import { DataTypes, sequelize } from "../db/connection.js";

export const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

export const createRoles = async () => {
    await Role.bulkCreate([
        { name: 'admin' },
        { name: 'seller' },
        { name: 'client' },
    ])
    console.log('Roles created successfully.')
}