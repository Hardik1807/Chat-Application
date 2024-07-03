import mongoose from "mongoose";

const userModel= new mongoose.Schema({
    FullName : {
        type: String,
        required: true,
    },
    username : {
        type: String,
        required: true,
        unique:true
    },
    Password : {
        type: String,
        required: true,
    },
    profilePhoto:{
        type:String,
        // required:true
        default:""
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true
    }
},{timestamps:true});

const User = mongoose.model("User",userModel);
export default User;