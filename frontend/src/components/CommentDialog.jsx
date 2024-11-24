import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import { setPosts } from "@/redux/postSlice";
import { toast } from "sonner";
import axios from "axios";

export default function CommentDialog({ open, setopen, post }) {
   const [text, setText] = useState("");
  const { selectedPost } = useSelector((store) => store.post);
  const [comment, setcomment] = useState([]);
  const dispatch = useDispatch();

  const chanageEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
        setText(inputText);
    } else {
        setText("");
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${selectedPost?._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setText("");
        const updatedCommentData = [...comment, res.data.message];
        setcomment(updatedCommentData);
        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
        );
        toast.success(res.data.message);
        dispatch(setPosts(updatedPostData));
        
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(()=>{
    if(selectedPost){
        setcomment(selectedPost.comments)
    }
  },[selectedPost])

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setopen(false)}
        className="max-w-5xl p-0 bg-white"
      >
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
                <Link to={"/profile"}>
                  <Avatar>
                    <AvatarImage src={selectedPost?.author?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <Link to={"/profile"} className="font-semibold text-sm">
                      {selectedPost?.author?.username}
                    </Link>
                    <p className="text-sky-600 text-xs font-semibold cursor-pointer">
                      Follower
                    </p>
                  </div>
                  <span className="text-xs text-gray-600 w-[100%] line-clamp-1">
                    {selectedPost?.author?.bio || "bio here ..."}
                  </span>
                </div>
              </div>
              <Dialog className='bg-white'>
                <DialogTrigger asChild >
                  <MoreHorizontal className=" cursor-pointer" />
                </DialogTrigger >
                <DialogContent className="flex flex-col  items-center text-sm text-center bg-white">
                  <div className=" cursor-pointer w-full text-[#ED4956] font-bold">
                    Unfollow
                  </div>
                  <div className=" cursor-pointer w-full ">
                    Add to favorites
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className="flex-1 overflow-y-auto max-h-[70%] h-full p-2 px-4">
              {
                comment.map((comment)=><Comment key={comment._id} comment={comment}/>)
              }
            </div>
            <div className="p-0">
              <div className="flex p-4 items-center gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={chanageEventHandler}
                  placeholder="Add a comment ..."
                  className="w-full outline-none border border-gray-400 bg-slate-100 p-2 rounded"
                />
                <Button
                  disabled={!text.trim()}
                  onClick={commentHandler}
                  variant="outline"
                  className="p-5"

                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
