import mongoose from "mongoose";

const conModel= new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }]
},{timestamps:true});

const Conversation = mongoose.model("Conversation",conModel);

export default Conversation;