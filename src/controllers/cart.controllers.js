import CartService from '../services/CartService.js'
import ProductService from '../services/ProductService.js'
import SellService from '../services/SellService.js'

export const getCart = async (req, res) => {
    try {
        const { sellId } = req.params
        const cart = await CartService.findCart(sellId)
        if (cart.length === 0) {
            throw ({
                statusCode: 404,
                message: "Carrito no encontrado"
            })
        }
        res.status(200).json(cart)
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message })
    }
}

export const addProductToCart = async (req, res) => {
    try {
        const { sellId, productId, quantity } = req.body
        const product = await ProductService.findOne(productId)
        if (!product || product.stock == 0) {
            throw ({
                statusCode: 404,
                message: "Producto no encontrado o sin stock"
            })
        }
        const sell = await SellService.getSell(sellId)
        if (!sell) {
            throw ({
                statusCode: 404,
                message: "Venta no encontrada"
            })
        }
        const subTotal = product.price * quantity;
        const updatedCart = await CartService.addProductToCart(productId, quantity, sellId, subTotal)
        if (!updatedCart) {
            throw ({
                statusCode: 400,
                message: "Error al crear el carrito"
            })
        }
        const updatedSell = await SellService.getSell(sellId)
        res.status(201).json({ message: `${product.name} agregado al carrito con exito`, updatedSell })
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message })
    }
}


export const updateProductInCart = async (req, res) => {
    try {
        const { sellId, productId, action } = req.body
        if (action !== 'add' && action !== 'remove') {
            throw ({
                statusCode: 400,
                message: "Acción no permitida"
            })
        }
        const sell = await SellService.getSell(sellId)
        if (!sell) {
            throw ({
                statusCode: 404,
                message: "Venta no encontrada"
            })
        }
        await CartService.updateProductInCart(productId, sellId, action)

        const updatedSell = await SellService.getSell(sellId)
        res.status(200).json({ message: "Producto actualizado con exito", updatedSell })

    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json({ message: error })
    }
}