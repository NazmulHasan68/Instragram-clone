import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
    participants : [{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    messages: [{type:mongoose.Schema.Types.ObjectId, ref:'Message'}]
})

export const Conversation = mongoose.model('Conversation', ConversationSchema)