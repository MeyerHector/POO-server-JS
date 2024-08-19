import ProductService from "../services/ProductService.js"

export const getProducts = async (req, res) => {
    try {
        const products = await ProductService.findAll()
        if (products.length === 0) {
            throw ({
                statusCode: 404,
                message: "No se encontraron productos"
            })
        }
        return res.status(200).json(products)
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message })
    }
}

export const createProduct = async (req, res) => {
    const { id } = req.user.Store
    try {
        const product = req.body
        const newProduct = await ProductService.create(product, id)
        if (!newProduct) {
            throw ({
                statusCode: 400,
                message: "Ocurrio un error creando el producto"
            })
        }
        return res.status(201).json(newProduct)
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message })
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.user.Store
    try {
        const { productId } = req.params;
        const product = req.body;
        const updateProduct = await ProductService.update(productId, product, id)
        if (!updateProduct) {
            throw ({
                statusCode: 400,
                message: "Error al actualizar el producto"
            })
        }

    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message })
    }
}