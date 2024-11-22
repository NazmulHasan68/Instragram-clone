import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Post({post}) {
    const [text, setText] = useState("")
    const [open, setopen] = useState(false)
    const {user} = useSelector(state =>state.auth)

    const changeEventHandler = (e)=>{
        const inputText = e.target.value;
        if(inputText.trim()){
            setText(inputText)
        }else{
            setText("")
        }
    }
    console.log(post.image);
    
  return (
    <div className="w-full max-w-sm mx-auto overflow-y-auto shadow-md p-2 my-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.profilePicture} alt="post_image" />
            <AvatarFallback>NZ</AvatarFallback>
          </Avatar>
          <h1>{user.username}</h1>
        </div>
        <Dialog>
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
            <Button variant="ghost" className="cursor-pointer w-fit">
              Delete
            </Button>
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
                <FaRegHeart size={22} className=" cursor-pointer"/>
                {/* <FaHeart size={22} /> */}
                <MessageCircle onClick={()=>setopen(true)} className=" cursor-pointer hover:text-gray-600"/>
                <Send className=" cursor-pointer hover:text-gray-600"/>
            </div>
            <Bookmark className=" cursor-pointer hover:text-gray-600"/>
        </div>
        <span className="font-medium block mb-2 text-sm">1k likes </span>
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
