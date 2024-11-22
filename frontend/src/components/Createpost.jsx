import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { readFileAsDataURL } from "@/lib/utils";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";


export default function Createpost({open, setopen}) {
    const imageRef = useRef()
    const [file , setFile] = useState("")
    const [caption, setCaption] = useState("")
    const [imagePreview , setImagePreview] = useState("")
    const [loading , setloading] = useState(false)
    const {posts} = useSelector(state=>state.post)
    const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch()

    const createPostHandler = async(e)=>{
      const formData = new FormData()
      formData.append('caption', caption)
      if(imagePreview) formData.append('image', file)
      try {
        setloading(true)
        const res = await axios.post('http://localhost:8000/api/v1/post/addpost', formData ,{
            headers:{"Content-Type" : 'multipart/form-data'}, withCredentials:true
        })
        if(res.data.success){
            dispatch(setPosts({
              posts: [...posts.posts, res.data.post], 
              ...posts, 
          }));
          toast.success(res.data.message)
          setopen(false)
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }finally{
        setloading(false)
      }
    }

    const FileChangeHandler = async(e) =>{
        const file = e.target.files?.[0];
        if(file){
            setFile(file)
            const dataUrl = await readFileAsDataURL(file);
            setImagePreview(dataUrl)
        }

    }
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={()=>setopen(false)}>
        <DialogHeader className='font-semibold mx-auto'>Create New Post</DialogHeader>
        <div className="flex gap-3 items-center">
            <Avatar>
                <AvatarImage src={user.profilePicture} alt="img"/>
                {/* <AvatarFallback>CN</AvatarFallback> */}
            </Avatar>
            <div>
                <h1 className="font-semibold text-xs">{user.username}</h1>
                <span className="text-xs text-gray-500">Bio here ...</span>
            </div>
        </div>
        <Textarea value={caption} onChange={(e)=>setCaption(e.target.value)} className=' focus-visible:ring-transparent border-none' placeholder="Write a Caption ....."/>
        {
            imagePreview && (
                <div className="w-full h-64 flex items-center justify-center">
                    <img src={imagePreview} className="h-full w-full object-cover rounded-md" alt="preview_img"/>
                </div>
            )
        }
        <input type="file" className="hidden" ref={imageRef} onChange={FileChangeHandler} />
        <button onClick={()=>imageRef.current.click()} className="w-fit text-sm mx-auto bg-[#0095F6] hover:bg-[#257eb9] p-3 rounded-lg text-white">Selete from computer</button>
        {
            imagePreview && ( loading ?<> <div className="flex w-full mx-auto text-center p-3 rounded-lg bg-[#0095F6]"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</div></> : <Button type="submit" onClick={createPostHandler} className="w-full">Post</Button>)
        }
      </DialogContent>
    </Dialog>
  )
}
