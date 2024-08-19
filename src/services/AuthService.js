import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { TOKEN_SECRET_KEY } from "../config/conf.js";
import { createJTW } from "../middlewares/jwt/createJWT.js";
import { comparePassword } from "../helpers/hashPass.js";

class AuthService {

    constructor() { }

    async signUp(username, password, role) {
        const isUser = await User.findOne({ where: username })
        if (isUser) throw ({
            message: 'Ya existe una cuenta con ese usuario'
        })
        const roleId = null

        if (role = 'seller') roleId = 2
        else if (role = 'client') roleId = 3

        const user = await User.create(username, password, roleId)

        return jwt.sign(user.id, TOKEN_SECRET_KEY)
    }

    async logIn(username, password) {
        try {

            const isUser = await User.findOne({ where: { username } })
            if (!isUser) throw ({
                message: 'No se encontro una cuenta con ese usuario'
            })
            if (!await comparePassword(password, isUser.password)) {
                throw ({
                    message: 'Contrasena incorrecta'
                })
            }
            return createJTW(isUser.id)

        } catch (error) {
            throw error
        }
    }
}

export default new AuthService()