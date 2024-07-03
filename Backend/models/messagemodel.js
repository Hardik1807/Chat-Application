import mongoose from "mongoose";

const msgModel= new mongoose.Schema({
    SenderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    RecieverId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    message : {
        type: String,
        required: true,
    },
 
},{timestamps:true});

const Message= mongoose.model("Message",msgModel);

export default Message;