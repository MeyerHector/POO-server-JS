import { Sell } from "../models/sell.js";
import { Cart } from "../models/cart.js";
import { Tax } from "../models/tax.js";
import { Product } from "../models/product.js";

class SellService {

    constructor() { }

    async createSell(productId, quantity) {
        try {
            const product = await Product.findOne({ where: { id: productId } })
            if (!product) {
                throw ({
                    message: "Producto no encontrado"
                })
            }
            const sell = await Sell.create({ statusId: 1 })
            if (!sell) {
                throw ({
                    message: "Error al crear la venta"
                })
            }
            const cart = await Cart.create({ productId: product.id, quantity, subTotal: product.price * quantity, sellId: sell.id })
            if (!cart) {
                throw ({
                    message: "Error al crear el carrito"
                })
            }

            return await this.getSell(sell.id)
        } catch (error) {
            throw error
        }
    }
    async getSells(statusId) {
        try {
            const sells = await Sell.findAll({
                where: {
                    statusId
                },
                include: {
                    model: Cart,
                    include: {
                        model: Product
                    }
                }
            });
            if (sells.length == 0) {
                throw ({
                    message: "No se encontraron ventas disponibles para esta categoria"
                })
            }
            return sells
        } catch (error) {
            throw error
        }
    }

    async getSell(sellId) {
        try {
            const sell = await Sell.findOne({
                where: { id: sellId },
                include: {
                    model: Cart,
                    attributes: ['id', 'productId', 'quantity', 'subTotal'],
                    include: {
                        model: Product,
                        attributes: ['id', 'name', 'price']
                    }
                }
            })
            if (!sell) {
                throw ({
                    message: "Venta no encontrada"
                })
            }
            let subTotal = 0;
            sell.Carts.map(cart => {
                subTotal += cart.Product.price * cart.quantity
            })

            const taxesData = await Tax.findAll({ attributes: ['rate', 'name'] })

            let taxes = []
            taxesData.map(tax => {
                taxes.push({ rate: Number(tax.rate), name: tax.name })
            })
            let totalTaxes = 0;
            taxes.map(tax => {
                totalTaxes += tax.rate
            })
            const total = subTotal + (subTotal * totalTaxes);

            await Sell.update({ total, subtotal: subTotal, taxes: totalTaxes }, { where: { id: sellId } })
            return await Sell.findOne({
                where: { id: sellId },
                include: {
                    model: Cart,
                    attributes: ['id', 'productId', 'quantity', 'subTotal'],
                    include: {
                        model: Product,
                        attributes: ['id', 'name', 'price']
                    }
                }
            })

        } catch (error) {
            throw error
        }
    }
}

export default new SellService()