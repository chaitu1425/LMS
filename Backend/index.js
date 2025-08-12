import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/connectd.js";
import cookieParser from "cookie-parser";
import authroute from "./route/authroute.js";
import cors from 'cors'
import userRouter from "./route/userRoute.js";
dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use("/api/auth",authroute)
app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
    res.send("hello");
})

app.listen(process.env.PORT ,()=>{
    console.log(`Server running ${process.env.PORT}`);
    connectdb()
    
})
