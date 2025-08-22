import Course from '../model/CourseModel.js'

export const searchWithAI = async(req,res)=>{
    try {
        const {input} = req.body
        if(!input){
            return res.status(400).json({messsage:"Search query is required"})
        }
        const courses = await Course.find({
            isPublished:true,
            $or:[
                {title:{$regex:input,$options:'i'}},
                {subTitle:{$regex:input,$options:'i'}},
                {description:{$regex:input,$options:'i'}},
                {category:{$regex:input,$options:'i'}},
                {level:{$regex:input,$options:'i'}}
            ]
        })
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({messsage:`Failed to search ${error}`})
        
    }
}
