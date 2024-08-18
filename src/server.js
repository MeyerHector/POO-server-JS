import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT } from "./config/conf.js";
import { connectDB } from "./db/connection.js";
import { sync } from "./db/sync.js";
import { routes } from "./routes/export.routes.js";

class Server {
    constructor() {
        this.app = express();
        this.port = PORT;
        this.middlewares();
        this.routes();
        this.dbConnect();
        this.syncDb()
        this.listen();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan("dev"));
    }
    async dbConnect() {
        await connectDB()
    }

    async syncDb() {
        await sync()
    }

    routes() {
        routes(this.app)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }

}

export default Server