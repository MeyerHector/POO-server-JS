import { Sell } from "../models/sell.js";
import { Cart } from "../models/cart.js";
import { Tax } from "../models/tax.js";
import { Product } from "../models/product.js";
import { Status } from "../models/status.js";
import { Discount } from "../models/discount.js";
import { DataTypes, DATE } from "sequelize";

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
                    attributes: ['id', 'productId', 'quantity', 'subTotal'],
                    include: {
                        model: Product,
                        attributes: ['id', 'name', 'price']
                    }
                }
            });

            if (sells.length == 0) {
                const status = await Status.findOne({ where: { id: statusId }, attributes: ['name'] })
                throw ({
                    message: `No se encontraron ventas disponibles para esta categoria (${status.name})`
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
            let total = subTotal + (subTotal * totalTaxes);

            if (sell.discount !== null) {
                total = total - (total * sell.discount)
            }

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

    async setPaymentMethod(sellId, paymentMethod, cupon) {
        try {
            const sell = await Sell.findOne({ where: { id: sellId } })

            if (!sell) {
                throw ({
                    message: "Venta no encontrada"
                })
            }
            if (sell.statusId == 2) {
                throw ({
                    message: "La venta ya fue pagada"
                })
            }
            let discount = 0
            let total = sell.total

            if (cupon) {
                const { rate } = await Discount.findOne({ where: { cupon }, attributes: ['rate'] })
                if (!rate) {
                    throw ({
                        message: "Cupon no valido"
                    })
                }

                discount = Number(rate)
            }
            if (paymentMethod == "efectivo") {
                const paymentDiscount = await Discount.findOne({ where: { name: 'Pago en efectivo' } })
                discount += Number(paymentDiscount.rate)
                total = sell.total - (sell.total * discount)
            }

            await Sell.update({ paymentMethod, total, discount }, { where: { id: sellId } })

            return await this.getSell(sellId)
        } catch (error) {
            throw error
        }
    }

    async paySell(sellId, payment) {

        try {
            const { statusId, total, paymentMethod } = await Sell.findByPk(sellId, { attributes: ['total', 'paymentMethod', 'statusId'] })

            if (statusId !== 1) {
                throw ({
                    message: 'Compra ya concretada o cancelada'
                })
            }
            let change = 0
            if (paymentMethod == 'efectivo') {
                if (payment < total) {
                    throw ({
                        message: `Faltan ${total - payment} pesos`
                    })
                } else if (payment > total) {
                    change = payment - total
                }
            }
            const updatedSell = await Sell.update({ statusId: 2, datePaid: Date.now() }, { where: { id: sellId } })

            if (updatedSell.length == 0) {
                throw ({
                    message: 'Hubo un error al pagar la compra'
                })
            }

            return { message: 'Pago concretado', change: change }
        } catch (error) {
            throw error
        }
    }

    async cancelSell(sellId) {
        try {
            const { statusId } = await Sell.findByPk(sellId, { attributes: ['statusId'] })
            if (statusId !== 1) {
                throw ({
                    message: 'Compra ya cancelada o concretada'
                })
            }
            const canceledSell = await Sell.update({ status: 3 }, { where: { id: sellId } })
            if (canceledSell.length == 0) {
                throw ({
                    message: 'Hubo un error al cancelar la compra'
                })
            }
        } catch (error) {
            throw error
        }
    }
}

export default new SellService()