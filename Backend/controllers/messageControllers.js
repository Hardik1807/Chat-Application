import Conversation from "../models/conversationmodel.js";
import Message from "../models/messagemodel.js"
import {getReceiverSocketId, io} from '../socket/socket.js'

export const sendMessage = async (req, res) => {

    const SenderId = req.id;
    const RecieverId = req.params.id;
    const { message } = req.body;
    console.log(SenderId,RecieverId,message)

    // console.log(message)

    let gotconversation = await Conversation.findOne({ participants: { $all: [SenderId, RecieverId] } })

    if (!gotconversation) {
        gotconversation = await Conversation.create({
            participants: [SenderId, RecieverId],
        })
    }

    const newmsg = await Message.create({
        SenderId,
        RecieverId,
        message,
    })

    gotconversation.messages.push(newmsg._id);
    // await gotconversation.save();

    // SOCKET.IO
    await Promise.all([gotconversation.save(), newmsg.save()]);
         
        // SOCKET IO
        const receiverSocketId = getReceiverSocketId(RecieverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newmsg);
        }

    return res.json(newmsg)

}


export const getMessage = async (req, res) => {
    // console.log("Hi")
    const SenderId = req.id;
    const RecieverId = req.params.id;

    if (SenderId === RecieverId) {
        return res.status(400).json({ message: "You can't send message to yourself" })
    }

    let conversation = await Conversation.findOne({ participants: { $all: [SenderId, RecieverId] } }).populate("messages")
    // console.log(conversation)
    if (conversation) {
        // conversation.messages.forEach((ele) => {
        //     console.log(ele.message);
        // })
        return res.json({data : conversation.messages, message:"Content sent"});
    }

        return res.json({ message: "No conversation found" })

}