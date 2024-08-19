import { hashPassword } from "../helpers/hashPass.js";
import AuthService from "../services/AuthService.js";

export const signUp = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        if (!username && !password && !role) {
            throw ({
                status: 400,
                message: 'Proporcione los datos necesarios (username, password y role)'
            })
        } else if (role !== 'seller' || role !== 'client') {
            throw ({
                status: 400,
                message: 'Rol no valido'
            })
        }
        const hashPass = hashPassword(password)
        const token = await AuthService.signUp(username, hashPass, role)

        res.status(200).json({ message: 'Cuenta creada con exito', token })
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username && !password) {
            throw ({
                status: 400,
                message: 'Proporcione los datos necesarios (username y password)'
            })
        }
        const token = await AuthService.logIn(username, password)
        res.status(200).json({ message: 'Inicio de sesion correcto', token })
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}