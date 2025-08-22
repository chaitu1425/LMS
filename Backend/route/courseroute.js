import express from 'express'
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getcreatorById, getCreatorCourses, getPublishedCourses, removeCourse, removeLecture } from '../controller/coursecontroller.js'
import isAuth from '../middleware/isAuth.js'
import upload from '../middleware/multer.js'
import { searchWithAI } from '../controller/searchController.js'

const courseRoute = express.Router()

// For Courses
courseRoute.post('/create',isAuth,createCourse)
courseRoute.get('/getpublished',getPublishedCourses)
courseRoute.get('/getcreator',isAuth,getCreatorCourses)
courseRoute.post('/editcourse/:courseId',isAuth,upload.single("thumbnail"),editCourse)
courseRoute.get('/getcourse/:courseId',isAuth,getCourseById)
courseRoute.delete('/deletecourse/:courseId',isAuth,removeCourse)
  

// For Lectures
courseRoute.post('/createlecture/:courseId',isAuth,createLecture)
courseRoute.get('/courselecture/:courseId',isAuth,getCourseLecture)
courseRoute.post('/editlecture/:lectureId',isAuth,upload.single("videoUrl"),editLecture)
courseRoute.delete('/removelecture/:lectureId',isAuth,removeLecture)
courseRoute.post('/creator',isAuth,getcreatorById)

// search
courseRoute.post("/search",searchWithAI)

export default courseRoute