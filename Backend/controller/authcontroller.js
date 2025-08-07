import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import gentoken from "./token.js";

export const Signup = async (req,res)=>{
    try{
        const {name , email , password, role} = req.body;
        const existuser = await User.findOne({email});
        if(existuser){  
           return res.status(400).json({message:"User already exist"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Enter valid email"})
        }
        if(password.length < 8){
            return res.status(400).json({message:"Enter Strong password"})
        }
        const hashpass = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password:hashpass,
            role
        })
        let token = await gentoken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite: "Strict",
            maxAge : 7 * 24 * 60 * 60 * 1000
        })
        res.status(201).json(user)
    }catch(err){
        return res.status(500).json({message:`signup error ${err}`})
    }
}


export const login = async (req,res)=>{
    try{
        const { email,password } = req.body
        let user = await User.findOne( {email} )
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        let isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Incorrect Password"})
        }
        let token = await gentoken(user._id)
        res.cookie("token",token , {
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge:7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json(user)

    }catch(err){
        return res.status(400).json({message:`Login error ${err}`})
    }
} 

export const logout = async(req,res)=>{
    try{
        await res.clearCookie("token")
        res.status(201).json({message:"Logout Success"})
    }catch(err){
        res.status(402).json({message:`Logout Error ${err}`})
    }
}