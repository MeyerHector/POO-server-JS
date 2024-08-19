import { Discount } from "../models/discount";

class DiscountService {
    constructor() { }

    async getCupons(userId) {
        try {
            const cupons = await Discount.findAll({ where: userId })
        } catch (error) {

        }
    }
}