import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";

export default function Post({post}) {
    const [text, setText] = useState("")
    const [open, setopen] = useState(false)
    const {user} = useSelector(state =>state.auth)
    const {posts} = useSelector(state =>state.post)
    const [postlike , setPostliked] = useState(post?.likes?.length)
    const [liked , setLiked] = useState(post?.likes?.includes(user?._id)|| false)
    const dispatch = useDispatch()

    const changeEventHandler = (e)=>{
        const inputText = e.target.value;
        if(inputText.trim()){
            setText(inputText)
        }else{
            setText("")
        }
    }

    const deletePostHandler = async() =>{
      try {
        const res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post._id}`,{withCredentials:true})
        if(res.data.success){
          setopen(false)
          const updatedPostData = posts.filter((postItem)=>postItem?._id !== post._id)
          dispatch(setPosts(updatedPostData))
          toast.success(res.data.message)
        }  
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
      }finally{
        setopen(false)
      }
    }


    const likeorDisLikeHandker = async()=>{
      try {
        const action = liked? 'dislike' : 'like'
        const res = await axios.post(`http://localhost:8000/api/v1/post/${post._id}/${action}`,{}, {withCredentials:true})
        if(res.data.success){
          const updatedlikes = liked? postlike-1 : postlike+1;
          setPostliked(updatedlikes)
          toast.success(res.data.message)
          setLiked(!liked)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  
  return (
    <div className="w-full max-w-sm mx-auto overflow-y-auto shadow-md p-2 my-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.profilePicture} alt="post_image" />
            <AvatarFallback>NZ</AvatarFallback>
          </Avatar>
          <h1>{post.author?.username}</h1>
        </div>
        <Dialog >
          <DialogTrigger asChild>
            <MoreHorizontal className=" cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>
            <Button variant="ghost" className="cursor-pointer w-fit ">
              Add to favorites
            </Button>
            {
              user && user?.id === post.author?._id &&  <Button variant="ghost" onClick={() => {deletePostHandler(); setopen(false)}} className="cursor-pointer w-fit">Delete</Button>
            }
            
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="w-full my-2 aspect-square object-cover"
        src={post?.image}
        alt="post img"
      />
      <div>
        <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
                <FaRegHeart size={22} className=" cursor-pointer" onClick={likeorDisLikeHandker}/>
                {/* <FaHeart size={22} /> */}
                <MessageCircle onClick={()=>setopen(true)} className=" cursor-pointer hover:text-gray-600"/>
                <Send className=" cursor-pointer hover:text-gray-600"/>
            </div>
            <Bookmark className=" cursor-pointer hover:text-gray-600"/>
        </div>
        <span className="font-medium block mb-2 text-sm">{postlike} k likes </span>
        <p>
            <span className="font-medium mr-2">username </span>
            {post.caption}
        </p>
        <span  onClick={()=>setopen(true)} className=" cursor-pointer text-sm text-gray-500">view all 10 comments</span>
        <CommentDialog open={open} setopen={setopen} post={post}/>
        <div className="flex justify-between items-center">
            <input 
                type="text"
                placeholder="Add a comment..."
                value={text}
                onChange={changeEventHandler}
                className=" outline-none text-sm w-full text-slate-600"
            />
            {
                text? <span className="text-[#3BADF8]">Post</span> : null
            }
           
        </div>
      </div>
    </div>
  );
}
