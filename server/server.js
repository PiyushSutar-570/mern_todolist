import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import  connectToDB  from "./config/db.js";
import authRouter from './routers/authRoutes.js'
import homeRouter from './routers/homeRoutes.js'

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())

connectToDB();

app.get('/',(req,res)=>{
    console.log("App is running on the backend server !");
})

app.use('/api/auth',authRouter);
app.use('/api/home',homeRouter);

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log("The server is running on the port-",PORT);
});