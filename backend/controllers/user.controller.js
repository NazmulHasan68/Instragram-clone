import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async(req, res)=>{
    try {
        const {username, email, password} = req.body
        if(!username, !email, !password) return res.status(401).json({success:false, message:"Something is messing, please check"})
        
        const user = await User.find({email})
        if(user) return res.status(401).json({success: false, message:"Try to different email"})
        
        const hashPassword = await bcrypt.hash(password,10)
        await User.create({username, email, password:hashPassword})

        return res.status(201).json({success:true, message:"Account created Successfully!"})
    } catch (error) {
        res.status(500).json({message:"Register error", error})
    }
}



export const login = async(req, res)=>{
    try {
        const {email, password} = req.body
        if(!email, !password) return res.status(401).json({success:false, message:"Something is messing, please check"})
        
        let user = await User.findOne({email})
        if(user) return res.status(401).json({success: false, message:"user not found!"})
        
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch) return res.status(401).json({success:false, message:"Incorrect email or password!"})
        
        user ={
            id: user._id,
            username : user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers : user.followers,
            following : user.following,
            posts : user.posts,
            bookmarks : user.bookmarks
        }
        const token = await jwt.sign({userId:user._id}, process.env.JWT_KEY, {expiresIn:'1d'})
        return res.cookie('token', token, {httpOnly:true, sameSite:'strict', maxAge:1*24*60*60*1000}).json({success:true, user, message:`Welcome Back ${user.username}`})

    } catch (error) {
        res.status(500).json({message:"Login error", error})
    }
}



export const logout = async(req, res) =>{
    try {
        return res.cookie("token", '', {maxAge:0}).json({success:true, message:"logged out successfully!"})
    } catch (error) {
        res.status(500).json({message:"Logout error", error})
    }
}



export const getProfile = async(req, res) =>{
    try {
        const userId = req.params.id
        let user = await User.findById(userId)
        return res.status(200).json({success:true, user, message:"Get User"})
    } catch (error) {
        res.status(500).json({message:"getProfile error", error})
    }
}


export const editProfile = async(req, res)=>{
    try {
        const userId = req.id
        let cloudResponse = 
    } catch (error) {
        res.status(500).json({message:"edit profile error", error})
    }
}

