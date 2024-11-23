import sharp from 'sharp'
import cloudinary from '../util/cloudinary.js'
import { Post } from '../models/post.mode.js'
import { User } from '../models/user.model.js'
import { Comment } from '../models/comment.mode.js'



export const addNewPost = async(req, res)=>{
    try {
        const {caption} = req.body
        const image = req.file
        const authoriId = req.id 

        if(!image) return res.status(400).json({success:false, message:"Image required"})
        const optimizedImageBuffer = await sharp(image.buffer)
                    .resize({width:800, height:800, fit:"inside"})
                    .toFormat('jpeg',{quality:80})
                    .toBuffer()
                    // buffer yo data uri
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`
        const cloudResponse = await cloudinary.uploader.upload(fileUri, { folder: "Instagram" })

        const post = await Post.create({caption, image:cloudResponse.secure_url, author:authoriId})
        
        //user push post the autor account
        const user = await User.findById(authoriId)
        if(!user) return res.status(404).json({success:false, message:"user not found!"})
        user.posts.push(post._id)
        await user.save()

        await post.populate({path:'author', select:'-password'}) //also author inisialized in post

        return res.status(200).json({success:true, post, message:"new post added"})
    } catch (error) {
        return res.status(500).json({success:false, message:"Add new post error"})
    }
}



export const getAllposts = async(req, res) =>{
    try {
        const post = await Post.find().sort({createdAt:-1})
        .populate({path:'author', select:'username profilePicture'})
        .populate({path:'comments', sort:{createdAt:-1}, populate:{path:"author", select:"username profilePicture"}})

        return res.status(200).json({success:true, post, message:"getAll posts Done!"})
    } catch (error) {
        return res.status(500).json({success:false, message:"Get All post error"})
    }
}


export const getUserPost = async(req, res)=>{
    try {
        const authorId = req.id
        const posts = await Post.find({author:authorId}).sort({createdAt:-1}).populate({path:"author", select:'username, profilePicture'})

        return res.status(200).json({success:false, posts, message:"Get user posts"})
    } catch (error) {
        return res.status(500).json({success:false, message:"Get user post error"})
    }
}


export const likePost = async(req, res)=>{
    try {
        const likekrneWalaUserkiId = req.id
        const postId = req.params.id

        const post = await Post.findById(postId)
        if(!post) return res.status(404).json({success:false, message:"Post not found!"})

        await Post.updateOne({$addToSet:{likes:likekrneWalaUserkiId}})
        await post.save()

        //implement socket io fro real time notification
        return res.status(200).json({success:true, message:"Post liked"})


    } catch (error) {
        return res.status(500).json({success:false, message:"like post error"})
    }
}


export const dislikePost = async(req, res)=>{
    try {
        const likekrneWalaUserkiId = req.id
        const postId = req.params.id

        const post = await Post.findById(postId)
        if(!post) return res.status(404).json({success:false, message:"Post not found!"})

        await Post.updateOne({$pull:{likes:likekrneWalaUserkiId}})
        await post.save()

        //implement socket io fro real time notification
        return res.status(200).json({success:true, message:"Post disliked"})

        
    } catch (error) {
        return res.status(500).json({success:false, message:"dislike post error"})
    }
}


export const addComment = async(req, res) =>{
    try {
        const postId = req.params.id
        const commentKarneWaUserKiId = req.id

        const {text} = req.body
        if(!text) return res.status(404).json({success:false, message:"text is requied!"})

        const post = await Post.findById(postId)
        if(!post) return res.status(404).json({success:false, message:"Post not found!"})
        
        const comment = await Comment.create({text, author:commentKarneWaUserKiId, post:postId})
            .populate({path:"author", select:"username, profilePicture"})

        post.comments.push(comment._id)
        await post.save()

        return res.status(201).json({success:true, comment, message:"Comment Added"})
        
    } catch (error) {
        return res.status(500).json({success:false, message:"addcommet  error"})
    }
}


export const getCommetsOfPost = async(req, res)=>{
    try {
        const postId = req.params.id
        const comments = await Comment.find({post:postId}).populate('author', 'username, profilePicture')
        if(!comments) return res.status(404).json({success:false, message:"No commets found for this post"})

        return res.status(200).json({success:true, comments, message:"Get Commets"})
    } catch (error) {
        return res.status(500).json({success:false, message:"Get post comment error"})
    }
}


export const deletePost = async(req, res)=>{
    try {
        const postId = req.params.id
        const author = req.id

        
        const post = await Post.findById(postId)
        if(!post) return res.status(404).json({success:false, message:"Post not found!"})

        if(post.author.toString() !== author) return res.status(403).json({success:false, message:"Unauthorized"})
        
        await Post.findByIdAndDelete(postId);

        //remove the post id from user
        let user = await User.findById(author)
        user.posts = user.posts.filter(id=>id.toString() !== postId)
        await user.save()

        //delete ssociated commets
        await Comment.deleteMany({post:postId})

        return res.status(200).json({success:true, message:"Post deleted"})

    } catch (error) {
        return res.status(500).json({success:false, message:"delete post error"})
    }
}



export const bookmarksPost = async(req, res)=>{
    try {
        const postId = req.params.id
        const authorId = req.id

        const post = await Post.findById({postId})
        if(!post) return res.status(404).json({success:false, message:"Post not found!"})
        
        const user = await User.findById(authorId)
        if(user.bookmarks.includes(post._id)){
            await user.updateOne({$pull:{bookmarks:post._id}})
            await user.save();
            return res.status(200).json({ success:true, type:'unsaved', message:'Post removed from bookmark'})
        }else{
            await user.updateOne({$addToSet:{bookmarks:post._id}})
            await user.save();
            return res.status(200).json({ success:true, type:'saved', message:'Post bookmark'})
        }
    } catch (error) {
        return res.status(500).json({success:false, message:"bookmarks error"})
    }
}