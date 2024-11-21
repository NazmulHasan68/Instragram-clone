import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("mongodb connected successfully");
    } catch (error) {
        console.log("mongodb not connected"); 
    }
}