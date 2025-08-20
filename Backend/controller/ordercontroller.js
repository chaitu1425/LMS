import razorpay from 'razorpay'
import dotenv from 'dotenv'
import Course from '../model/CourseModel.js'
import User from '../model/userModel.js'
dotenv.config()

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
})

export const RazorPayOrder = async(req,res)=>{
    try {
        const {courseId} = req.body 
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message:"Course not Found"})
        }
        const options = {
            amount:course.price*100,
            currency:'INR',
            receipt:`${courseId}.toString()`
        }
        const order = await razorpayInstance.orders.create(options)
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json({message:`Failed to Create RazorPay Order ${error}`})
    }
}
export const verifyPayment = async(req,res)=>{
    try {
        const {courseId, userId,razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            const user = await User.findById(userId)

            const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    
            if(!user.enrolledcourse.includes(courseId)){
                await user.enrolledcourse.push(courseId)
                await user.save()
            }
            const course = await Course.findById(courseId).populate("lectures")
            if(!course.enrolledStudents.includes(userId)){
                await course.enrolledStudents.push(userId)
                await course.save()   
            }
            return res.status(200).json({message:"Payment Verified and Enrolled successful"})
        }else{
            return res.status(400).json({message:"Payment failed"})
        }
    } catch (error) {
        return res.status(500).json({message:`Internal server error during payment verification ${error}`})
    }
}