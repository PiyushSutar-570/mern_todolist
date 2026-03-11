import mongoose from "mongoose";

const connectToDB = async() =>{
    await mongoose.connect('mongodb+srv://andumandu6:andumandu6@cluster0.eh098m7.mongodb.net/todolist');
    console.log("Database connected successfully !")
}

export default connectToDB;