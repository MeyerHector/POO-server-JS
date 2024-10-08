import jwt from 'jsonwebtoken'
import { TOKEN_SECRET_KEY } from '../config/conf.js';
import { User } from '../models/user.js';
import { Store } from '../models/store.js';
export const isSeller = async (req, res, next) => {
    let token = req.headers.authorization;
    token = token.split(' ')[1]
    try {
        if (!token) {
            throw ({
                status: 401,
                message: 'Vuelva a iniciar sesion para continuar'
            })
        }
        const { userId } = jwt.verify(token, TOKEN_SECRET_KEY)
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Store,
                attributes: ['id']
            }]
        })
        if (!user) throw ({
            status: 500,
            message: 'Vuelva a iniciar sesion para continuar'
        })
        else if (user.roleId !== 2) {
            throw ({
                status: 401,
                message: 'No tienes permisos para esta accion'
            })
        }
        req.user = user
        next()
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}