import express from 'express'
import { createReview, getReviews } from '../controller/ReviewController.js'
import isAuth from '../middleware/isAuth.js'

const reviewRouter = express.Router()

reviewRouter.post("/createreview",isAuth,createReview)
reviewRouter.get("/getreview",isAuth,getReviews)

export default reviewRouter