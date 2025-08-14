import express from 'express'
import { createCourse, editCourse, getCourseById, getCreatorCourses, getPublishedCourses, removeCourse } from '../controller/coursecontroller.js'
import isAuth from '../middleware/isAuth.js'
import upload from '../middleware/multer.js'

const courseRoute = express.Router()


courseRoute.post('/create',isAuth,createCourse)
courseRoute.get('/getpublished',getPublishedCourses)
courseRoute.get('/getcreator',isAuth,getCreatorCourses)
courseRoute.post('/editcourse/:courseId',isAuth,upload.single("thumbnail"),editCourse)
courseRoute.get('/getcourse/:courseId',isAuth,getCourseById)
courseRoute.delete('/deletecourse/:courseId',isAuth,removeCourse)

export default courseRoute