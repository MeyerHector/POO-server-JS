import { DataTypes, sequelize } from "../db/connection.js";

export const Store = sequelize.define('Store', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

export const createStores = async () => {
    await Store.bulkCreate([
        { userId: 1, name: 'HP electronics', description: 'Somos una compañía de tecnología que nació bajo la creencia de que las empresas deben hacer más que simplemente obtener una ganancia. Deben hacer del mundo un lugar mejor.' },
        { userId: 2, name: 'Apple Inc.', description: 'Apple es una empresa que diseña y produce equipos electrónicos, software y servicios en línea.' },
        { userId: 3, name: 'Samsung', description: 'Samsung es una empresa multinacional surcoreana que fabrica productos electrónicos y electrodomésticos.' },
        { userId: 4, name: 'Sony', description: 'Sony es una empresa japonesa que se dedica a la fabricación de productos electrónicos, videojuegos y entretenimiento.' },
        { userId: 5, name: 'Microsoft', description: 'Microsoft es una empresa de tecnología que desarrolla, fabrica, licencia y da soporte a una amplia gama de productos y servicios de software.' },
        { userId: 6, name: 'Google', description: 'Google es una empresa de tecnología que se especializa en servicios y productos relacionados con Internet, software, dispositivos electrónicos y otras tecnologías.' }
    ])
    console.log('Stores created successfully.')
}