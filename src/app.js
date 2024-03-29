import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app= express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true , limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import

import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);


export default app;