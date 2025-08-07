import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies
        if (!token) {
            return res.status(400).json({ message: "Token Not Found" })
        }
        const verifytoken = jwt.verify(token,process.env.JWT_Secret)
        req.userId = verifytoken.userId
        next()
    } catch (error) {
        res.status(400).json({message:`isAuth Error ${err}`})
    }
}

export default isAuth