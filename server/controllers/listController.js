import List from "../models/List.js";

const createTodo = async() =>{
    try {

        const {title,completed,user} = req.body;
        const existingTodo = await List.find({user,title});

        if(existingTodo){
            return res.status(403).json({
                success : false,
                message : 'The todo-list is already created !'
            })
        }
        
    } catch (error) {
        
    }
}