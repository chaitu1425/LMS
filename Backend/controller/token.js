import jwt from "jsonwebtoken";

const gentoken = async (userId)=>{
    try{
        const token = await jwt.sign({userId} , process.env.JWT_Secret, {expiresIn:"7d"})
        return token
    }catch(err){
        console.log(err);
        
    }
}

export default gentoken