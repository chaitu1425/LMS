import express from 'express'
import { RazorPayOrder, verifyPayment } from '../controller/ordercontroller'

const paymentRouter = express.Router()

paymentRouter.post("/razorpayorder",RazorPayOrder)
paymentRouter.post("/verifypayment",verifyPayment)

export default paymentRouter