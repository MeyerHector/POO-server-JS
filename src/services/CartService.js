import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";
import { Sell } from "../models/sell.js";

class CartService {
    constructor() { }
    async findCart(sellId) {
        return Cart.findAll({ where: { sellId } })
    }

    async addProductToCart(productId, quantity, sellId, subTotal) {
        return Cart.create({ productId, quantity, sellId, subTotal })
    }

    async updateProductInCart(productId, sellId, action) {
        console.log("se ejecuto updateProductInCart")
        try {
            const isProduct = await Product.findOne({ where: { id: productId } })
            if (!isProduct) {
                throw ({
                    message: 'Producto no encontrado'
                })
            }

            const isProductInCart = await Cart.findOne({ where: { productId, sellId } })

            if (!isProductInCart) {
                throw ({
                    message: 'No se encontro el producto en el carrito'
                })
            }

            if (action === 'add') {
                const cartQuantity = await Cart.findOne({ where: { productId, sellId } })

                const updatedCart = await Cart.update({ quantity: cartQuantity.quantity + 1 }, { where: { productId, sellId } })
                if (updatedCart.length === 0) {
                    throw ({
                        message: 'Error al actualizar el carrito'
                    })
                }
            } else if (action === 'remove') {
                const cart = await Cart.findOne({ where: { productId, sellId } })
                if (cart.quantity === 1) {
                    const deletedCart = await Cart.destroy({ where: { productId, sellId } })
                    if (deletedCart.length === 0) {
                        throw ({
                            message: 'Error al eliminar el producto del carrito'
                        })
                    }
                }
                const updatedCart = await Cart.update({ quantity: cart.quantity - 1 }, { where: { productId, sellId } })
                if (updatedCart.length === 0) {
                    throw ({
                        message: 'Error al actualizar el carrito'
                    })
                }
            }
        } catch (error) {
            throw error.message
        }
    }
    // actualizar el estado de Sell por 3 (paid), eliminar los productos del carrito y actualizar el stock de los productos
    async payCart(sellId) {
        try {
            const products = await Cart.findAll({
                where: { sellId },
                include: {
                    model: Product,
                    attributes: ['id', 'stock']
                }
            })

            if (products.length === 0) {
                throw ({
                    statusCode: 404,
                    message: "Carrito no encontrado"
                })
            }
            const subtotal = 0
            products.map(product => {
                subtotal += product.Product.price * product.quantity;
                const updatedStock = Product.update({ stock: product.Product.stock - product.quantity }, { where: { id: product.Product.id } });
                if (updatedStock.length === 0) {
                    throw ({
                        statusCode: 400,
                        message: "No se pudo actualizar el stock"
                    })
                }
                const deletedCart = Cart.destroy({
                    where: { productId: product.Product.id, sellId: products.sellId }
                })
                if (deletedCart.length === 0) {
                    throw ({
                        statusCode: 400,
                        message: "Error al eliminar el carrito"
                    })
                }
            })
            const updatedSell = await Sell.update({ statusId: 3 }, { where: { id: sellId } })

            if (updatedSell.length === 0) {
                throw ({
                    statusCode: 400,
                    message: "Error al actualizar el estado de la venta"
                })
            }
            return "Compra realizada con éxito"
        } catch (error) {
            throw error
        }
    }
}

export default new CartService()