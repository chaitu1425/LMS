import express from "express";
import { login, logout, resetPassword, sendOTP, Signup, verifyOTP } from "../controller/authcontroller.js";

const authroute = express.Router()

authroute.post('/signup',Signup)
authroute.post('/login',login)
authroute.get('/logout',logout)
authroute.post('/sendotp',sendOTP)
authroute.post('/verifyotp',verifyOTP)
authroute.post('/resetpassword',resetPassword)



export default authroute