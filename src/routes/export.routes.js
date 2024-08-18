import cartRoutes from "./cart.routes.js"
import productRoutes from "./product.routes.js"
import sellRoutes from "./sell.routes.js"

export const routes = (app) => {
    app.use('/api/', productRoutes)
    app.use('/api/', sellRoutes)
    app.use('/api/', cartRoutes)
}   