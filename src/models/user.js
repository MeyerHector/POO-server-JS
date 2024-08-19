import { DataTypes, sequelize } from "../db/connection.js";
import { hashPassword } from "../helpers/hashPass.js";
export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})



export const createUsers = async () => {
    await User.bulkCreate([
        { roleId: 1, username: 'admin', password: await hashPassword('admin123') },
        { roleId: 2, username: 'hp_user', password: await hashPassword('hp123') },
        { roleId: 2, username: 'apple_user', password: await hashPassword('apple123') },
        { roleId: 2, username: 'samsung_user', password: await hashPassword('samsung123') },
        { roleId: 2, username: 'sony_user', password: await hashPassword('sony123') },
        { roleId: 2, username: 'microsoft_user', password: await hashPassword('microsoft123') },
        { roleId: 2, username: 'google_user', password: await hashPassword('google123') },
        { roleId: 3, username: 'client', password: await hashPassword('client123') }
    ])
    console.log('Users created successfully.')
}