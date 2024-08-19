import bcrypt from "bcrypt";
export const hashPassword = (pass) => {
    return bcrypt.hash(pass, 10)
}
export const comparePassword = async (pass, hashPass) => {
    return await bcrypt.compare(pass, hashPass)
}