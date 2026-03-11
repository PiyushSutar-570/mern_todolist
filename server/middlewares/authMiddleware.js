import express from "express"
import jwt from "jsonwebtoken"
const authMiddleware = async(req,res,next) =>{
    try {
        const authHeader = req.headers['authorization'];
        console.log(authHeader);
        const token = authHeader && authHeader.split(" ")[1];

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!decodedToken){
            return res.status(403).json({
                success : false,
                message : "The token is invalid !"
            })
        }

        req.userInfo = decodedToken;
        next();
        
    } catch (error) {
        console.log("Error : ",error.message);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong'
        })
    }
}

export default authMiddleware;