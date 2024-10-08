import jwt from 'jsonwebtoken'
import { TOKEN_SECRET_KEY } from '../config/conf.js';
import { User } from '../models/user.js';
export const isToken = async (req, res, next) => {
    const { token } = req.headers.authorization;
    try {
        if (!token) {
            throw ({
                status: 401,
                message: 'Vuelva a iniciar sesion para continuar'
            })
        }
        const { userId } = jwt.verify(token, TOKEN_SECRET_KEY)
        const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } })
        if (!user) throw ({
            status: 500,
            message: 'Vuelva a iniciar sesion para continuar'
        })

        req.user = user
        next()
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}