import mongoose, { Mongoose } from "mongoose";

const MessageSchema = new mongoose.Schema({
    senderId:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    receiverId:{type: mongoose.Schema.Types.ObjectId , ref:'User'},
    textMessage: {type:String, required:true}
})

export const Message = mongoose.model("Message", MessageSchema)