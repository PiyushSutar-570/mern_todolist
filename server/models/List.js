import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    completed : {
        type : Boolean,
        default : false,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    }
},{timestamps : true});

const List = mongoose.model('List',listSchema);

export default List;