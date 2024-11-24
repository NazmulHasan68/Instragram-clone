// for chating

import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
      const senderId = req.id; // Assuming middleware populates `req.id`
      const receiverId = req.params.id; // Receiver's ID from the route parameter
      const { textMessage } = req.body;
  
      // Find or create a conversation between the two participants
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });
  
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
          textMessage: [], // Initialize messages array
        });
      }
  
      // Create the new message
      const newMessage = await Message.create({
        senderId,
        receiverId,
        textMessage
      });
  
      // Push the message into the conversation's messages array
      conversation.messages.push(newMessage._id);
  
      // Save both the conversation and the new message
      await Promise.all([conversation.save(), newMessage.save()]);
  
      // Implement socket.io for real-time updates
      const receiverSocketId = getReceiverSocketId(receiverId); // Assume this function is defined
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
  
      // Respond to the client
      return res
        .status(200)
        .json({ success: true, newMessage, message: "New message created!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "sendMessage error", error });
    }
  };
  





export const getMessage = async(req,res)=>{
    try {
        const senderId = req.id
        const receiverId = req.params.id

        const conversation = await Conversation.findOne({
            participants:{$all : [senderId, receiverId]}
        }).populate('messages')
        if(!conversation) return res.status(200).json({success:true, messages:[]})

        return res.status(200).json({success:true, messages:conversation?.messages})

    } catch (error) {
        return res.status(500).json({success:false, message:"GetMessages error"})  
    }
}