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

}

export default new CartService()