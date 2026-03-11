import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/welcome',authMiddleware,(req,res)=>{
    try {
        res.status(200).json({
            success : true,
            message : 'Welcome to the home page !'
        })
    } catch (error) {
        console.log("Error : ",error.message);
        res.status(500).json({
            success : false,
            message : 'Something went wrong !'
        })
    }
})

export default router;