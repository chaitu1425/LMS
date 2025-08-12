import express from "express";
import { googleauth, login, logout, resetPassword, sendOTP, Signup, verifyOTP } from "../controller/authcontroller.js";

const authroute = express.Router()

authroute.post('/signup',Signup)
authroute.post('/login',login)
authroute.get('/logout',logout)
authroute.post('/sendotp',sendOTP)
authroute.post('/verifyotp',verifyOTP)
authroute.post('/resetpassword',resetPassword)
authroute.post('/googleauth',googleauth)



export default authroute