import express from "express";
import { login, logout, Signup } from "../controller/authcontroller.js";

const authroute = express.Router()

authroute.post('/signup',Signup)
authroute.post('/login',login)
authroute.get('/logout',logout)


export default authroute