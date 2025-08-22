import mongoose from "mongoose";

const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.DBURL)
        console.log("DB Connected");
    }catch(err){
        console.log(err);
    }
}

export default connectdb 