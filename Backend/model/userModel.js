import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:["student","educator"],
        required:true
    },
    photoUrl:{
        type:String,
        default:""
    },
    enrolledcourse:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    resetOtp:{
        type:String
    },
    otpExpires:{
        type:Date
    },
    isOtpverifed:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const User = mongoose.model("User",UserSchema)

export default User

