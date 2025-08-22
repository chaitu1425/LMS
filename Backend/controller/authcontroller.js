import User from "../model/userModel.js";
import validator from "validator"
import bcrypt, { hash } from "bcryptjs"
import gentoken from "./token.js";
import sendmail from "../config/sendMail.js";

export const Signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existuser = await User.findOne({ email });
        if (existuser) {
            return res.status(400).json({ message: "User already exist" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter valid email" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Enter Strong password" })
        }
        const hashpass = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashpass,
            role
        })
        let token = await gentoken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(201).json(user)
    } catch (err) {
        return res.status(500).json({ message: `signup error ${err}` })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" })
        }
        let token = await gentoken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json(user)

    } catch (err) {
        return res.status(400).json({ message: `Login error ${err}` })
    }
}

export const logout = async (req, res) => {
    try {
        await res.clearCookie("token")
        res.status(201).json({ message: "Logout Success" })
    } catch (err) {
        res.status(402).json({ message: `Logout Error ${err}` })
    }
}

export const sendOTP = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User Not Found" })
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.otpExpires = Date.now() + 5 * 60 * 1000
        user.isOtpverifed = false

        await user.save()
        await sendmail(email, otp)
        return res.status(200).json({ message: "Otp Send Successfully" })
    } catch (error) {
        return res.status(400).json({ message: `Send OTP error ${error}` })
    }
}

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email })
        if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid OTP" })
        }
            user.isOtpverifed = true,
            user.resetOtp = undefined,
            user.otpExpires = undefined

        await user.save()

        return res.status(200).json({ message: "OTP Verified Successfully" })
    } catch (error) {
        return res.status(400).json({ message: `Verify OTP error ${error}`})
    }
}


export const resetPassword = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
          if(!user || !user.isOtpverifed){
            return res.status(400).json({message:"OTP Verification Required"})
        }
        const hashedpassword = await bcrypt.hash(password,10);
        user.password = hashedpassword,
        user.isOtpverifed = false

        await user.save()
        return res.status(200).json({message:"Reset Password Successfully"})
    } catch (error) {
        return res.status(400).json({ message: `Password Reset error ${error}`})
    }
}


export const googleauth = async (req,res) => {
    try{
        const {name,email,role} = req.body
        const user =await User.findOne({email})
        if(!user){
            user = await User.create({
                name,
                email,
                role
            })
        }
        let token = await gentoken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json(user)
    }catch(err){
        return res.status(500).json({message:`Google Auth Error ${err}`})
    }
}
