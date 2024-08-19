import { PAYMENT_METHODS } from "../constants/paymentMethods.js";
import { sinDiacriticos } from "../helpers/sinDiacriticos.js";
import SellService from "../services/SellService.js"


export const getSells = async (req, res) => {
    const { statusId } = req.params;
    try {
        if (!statusId) throw ({
            status: 400,
            message: "Seleccione un estado para ver las ventas"
        })
        else if (statusId < 1 || statusId > 3) throw ({
            status: 400,
            message: "Seleccione un estado valido"
        })
        const sells = await SellService.getSells(statusId);
        console.log(sells)
        res.status(200).json(sells);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export const getSell = async (req, res) => {
    const { sellId } = req.params;

    try {
        if (!sellId) {
            throw ({
                status: 400,
                message: "Seleccione una venta para ver"
            })
        };

        const sell = await SellService.getSell(sellId)
        console.log(sell)
        res.status(200).json(sell)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export const createSell = async (req, res) => {
    const { productId, quantity } = req.body
    try {
        if (!productId) {
            throw ({
                status: 400,
                message: 'Para crear un carrito seleccione un producto'
            })
        }
        const sell = await SellService.createSell(productId, quantity)
        if (!sell) {
            throw ({
                status: 400,
                message: 'Error al crear la venta'
            })
        }
        res.status(201).json({ message: "Venta creada con éxito", sell })
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ message: error.message })
    }
}

export const setPaymentMethod = async (req, res) => {
    const { sellId } = req.params;
    let { paymentMethod, cupon } = req.body

    try {
        if (!sellId && !!paymentMethod) {
            throw ({
                status: 400,
                message: "No se seleecciono la venta y/o el metodo de pago"
            })
        }
        paymentMethod = paymentMethod.toLowerCase()
        paymentMethod = sinDiacriticos(paymentMethod)
        console.log(paymentMethod, 'sin tildes')
        if (!PAYMENT_METHODS.includes(paymentMethod)) {
            throw ({
                status: 400,
                message: `Metodo de pago ${paymentMethod} no autorizado, solo se admiten pagos con ${PAYMENT_METHODS.join(", ")}`
            })
        }

        const settedPayment = await SellService.setPaymentMethod(sellId, paymentMethod, cupon)

        res.status(201).json({ message: `El total de su compra es ${settedPayment.total}`, settedPayment })
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export const paySell = async (req, res) => {

    const { sellId } = req.params;
    const { payment } = req.body;

    try {
        if (!sellId && !payment) {
            throw ({
                status: 400,
                message: 'Proporcione el id de la compra y el pago total'
            })
        }
        const pay = await SellService.paySell(sellId, payment)

        res.status(201).json(pay)
    } catch (error) {
        res.status(error.status || 500).json(error.message)
    }
}

export const cancelSell = async (req, res) => {
    const { sellId } = req.params;

    try {
        if (!sellId) {
            throw ({
                status: 400,
                message: 'Proporcione el id de la compra'
            })
        }
        await SellService.cancelSell(sellId)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}