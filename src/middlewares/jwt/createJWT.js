import jwt from 'jsonwebtoken'
import { TOKEN_SECRET_KEY } from '../../config/conf.js'
export const createJTW = (userId) => {
    return jwt.sign({ userId: userId }, TOKEN_SECRET_KEY)
}