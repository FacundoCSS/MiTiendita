import express from 'express'
import fileUpload from 'express-fileupload';
import cors from "cors";

import oderRoutes from './routes/orders.routes.js'
import productsRoutes from './routes/products.routes.js'
import shopsRoutes from './routes/shops.routes.js'

const app = express()

// midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
}))
app.use(cors());

//routes
app.use(oderRoutes)
app.use(productsRoutes)
app.use(shopsRoutes)

export default app