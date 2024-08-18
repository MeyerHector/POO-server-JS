import { DataTypes, sequelize } from "../db/connection.js";

export const Status = sequelize.define('Status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

export const createStatus = async () => {

    await Status.bulkCreate([
        { name: 'pending' },
        { name: 'paid' },
        { name: 'cancelled' },
    ])
    console.log('Status was created successfully.')
}