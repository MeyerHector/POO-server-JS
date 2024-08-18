import { sequelize, DataTypes } from "../db/connection.js";

export const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL
    },
    category: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.INTEGER
    }
})


export const createProducts = async () => {
    await Product.bulkCreate([
        { name: 'Aspiradora', brand: 'Sony', price: 80000, category: 'Aspiradora', stock: 10 },
        { name: 'Notebook', brand: 'HP', price: 1300000, category: 'Notebooks y accesorios', stock: 20 },
        { name: 'Termo Stanley Quencher', brand: 'Stanley', price: 130000, category: 'Recipientes Termicos', stock: 30 },
        { name: 'Cafetera', brand: 'Philips', price: 30000, category: 'Cafeteras', stock: 40 },
        { name: 'Smart TV', brand: 'Samsung', price: 500000, category: 'Televisores', stock: 50 },
        { name: 'Celular', brand: 'Samsung', price: 160000, category: 'Celulares y telefonos', stock: 60 },
        { name: 'Silla Gamer', brand: 'Gamer', price: 90000, category: 'Sillas', stock: 70 },
        { name: 'Auriculares', brand: 'Sony', price: 180000, category: 'Auriculares', stock: 80 },
        { name: 'Mesa de luz', brand: 'Muebles', price: 50000, category: 'Muebles', stock: 90 },
        { name: 'Heladera', brand: 'Whirpool', price: 800000, category: 'Heladeras', stock: 100 },
    ])
    console.log('Products created successfully.')
}