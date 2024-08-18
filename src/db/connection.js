import { Sequelize, DataTypes } from "sequelize";
import { URI } from "../config/conf.js";
export const sequelize = new Sequelize(URI)
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to db has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export { DataTypes }