import { sequelize, DataTypes } from "../db/connection.js";

export const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    storeId: {
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
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


export const createProducts = async () => {
    await Product.bulkCreate([
        { name: 'Notebook', storeId: 1, brand: 'HP', price: 1560000, category: 'Notebooks y accesorios', stock: 20 },
        { name: 'Impresora', storeId: 1, brand: 'HP', price: 240000, category: 'Impresoras y accesorios', stock: 15 },
        { name: 'Monitor', storeId: 1, brand: 'HP', price: 360000, category: 'Monitores', stock: 10 },
        { name: 'Teclado', storeId: 1, brand: 'HP', price: 60000, category: 'Accesorios', stock: 30 },

        { name: 'iPhone', storeId: 2, brand: 'Apple', price: 1200000, category: 'Smartphones', stock: 25 },
        { name: 'MacBook', storeId: 2, brand: 'Apple', price: 1800000, category: 'Laptops', stock: 10 },
        { name: 'iPad', storeId: 2, brand: 'Apple', price: 960000, category: 'Tablets', stock: 20 },
        { name: 'Apple Watch', storeId: 2, brand: 'Apple', price: 480000, category: 'Wearables', stock: 15 },

        { name: 'Galaxy S21', storeId: 3, brand: 'Samsung', price: 1080000, category: 'Smartphones', stock: 30 },
        { name: 'Galaxy Tab', storeId: 3, brand: 'Samsung', price: 720000, category: 'Tablets', stock: 20 },
        { name: 'Smart TV', storeId: 3, brand: 'Samsung', price: 1440000, category: 'Televisores', stock: 10 },
        { name: 'Galaxy Buds', storeId: 3, brand: 'Samsung', price: 180000, category: 'Accesorios', stock: 40 },

        { name: 'PlayStation 5', storeId: 4, brand: 'Sony', price: 600000, category: 'Consolas', stock: 15 },
        { name: 'Sony Xperia', storeId: 4, brand: 'Sony', price: 840000, category: 'Smartphones', stock: 20 },
        { name: 'Sony Bravia', storeId: 4, brand: 'Sony', price: 1200000, category: 'Televisores', stock: 10 },
        { name: 'Sony WH-1000XM4', storeId: 4, brand: 'Sony', price: 420000, category: 'Auriculares', stock: 25 },

        { name: 'Surface Pro', storeId: 5, brand: 'Microsoft', price: 1440000, category: 'Tablets', stock: 15 },
        { name: 'Xbox Series X', storeId: 5, brand: 'Microsoft', price: 600000, category: 'Consolas', stock: 20 },
        { name: 'Microsoft Office', storeId: 5, brand: 'Microsoft', price: 180000, category: 'Software', stock: 50 },
        { name: 'Surface Laptop', storeId: 5, brand: 'Microsoft', price: 1200000, category: 'Laptops', stock: 10 },

        { name: 'Pixel 5', storeId: 6, brand: 'Google', price: 840000, category: 'Smartphones', stock: 25 },
        { name: 'Nest Hub', storeId: 6, brand: 'Google', price: 120000, category: 'Smart Home', stock: 30 },
        { name: 'Chromecast', storeId: 6, brand: 'Google', price: 60000, category: 'Accesorios', stock: 40 },
        { name: 'Pixelbook', storeId: 6, brand: 'Google', price: 1080000, category: 'Laptops', stock: 15 }
    ])
    console.log('Products created successfully.')
}