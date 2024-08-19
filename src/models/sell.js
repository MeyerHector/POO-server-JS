import { DataTypes, sequelize } from "../db/connection.js";

export const Sell = sequelize.define('Sell', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    clientId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true
    },
    discount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    taxes: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    subtotal: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    datePaid: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    timestamps: false
})