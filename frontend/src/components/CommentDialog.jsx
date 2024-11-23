import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CommentDialog({open, setopen, post}) {
    const [text ,settext] = useState("")
    const {user } = useSelector(state=>state.auth)

    const chanageEventHandler = (e) =>{
        const inputText = e.target.value
        if(inputText.trim()){
            settext(inputText)
        }else{
            settext("")
        }
    }

    const sendMessageHandler = (e) =>{
        alert(text)
    }
    
  return (
    <Dialog open={open}>
        <DialogContent onInteractOutside={()=>setopen(false)} className="max-w-5xl p-0">
            <div className="flex justify-between">
                <div className="basis-1/2">
                    <img
                        className="w-full my-2 aspect-square object-cover"
                        src={post.image}
                        alt="post img"
                    />
                </div>
                <div className="w-1/2flex flex-col basis-1/2">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex gap-3 items-center">
                            <Link to={'/profile'}>
                                <Avatar>
                                    <AvatarImage src={user.profilePicture}/>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div className="flex flex-col">
                                <div className="flex gap-2 items-center">
                                    <Link to={'/profile'} className="font-semibold text-sm">{user.username}</Link>
                                    <p className="text-sky-600 text-xs font-semibold cursor-pointer">Follower</p>
                                </div>
                                <span className="text-xs text-gray-600">bio here ...</span>
                            </div>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <MoreHorizontal className=" cursor-pointer"/>
                            </DialogTrigger>
                            <DialogContent className="flex flex-col  items-center text-sm text-center">
                                <div className=" cursor-pointer w-full text-[#ED4956] font-bold">Unfollow</div>
                                <div className=" cursor-pointer w-full ">
                                    Add to favorites
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <hr/>
                    <div className="flex-1 overflow-y-auto max-h-96 h-full p-2 px-4">
                        comments ayenge
                    </div>
                    <div className="p-0">
                        <div className="flex p-4 items-center gap-2">
                            <input type="text" value={text} onChange={chanageEventHandler} placeholder="Add a comment ..." className="w-full outline-none border border-gray-300 p-2 rounded"/>
                            <Button disabled={!text.trim()} onClick={sendMessageHandler} variant="outline" className='p-5'>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}
