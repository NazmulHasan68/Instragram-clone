import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function EditProfile() {
    const {user} = useSelector(store =>store.auth)
    const imageRef = useRef()
    const [loading , setloading] = useState(false)
    const [input , setinput] = useState({
        profilePhoto:user?.profilePicture,
        bio:user?.bio,
        gender:user?.gender
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fileChangeHandler = (e) =>{
        const file = e.target.files?.[0]
        if(file) setinput({...input, profilePhoto: e.target?.[0]})
    }

    const SeletChangeHandler = async (value) =>{
        setinput({...input, gender:value})
    }


    const editProfileHandler = async()=>{
        const formData = new FormData()
        formData.append('bio', input.bio);
        formData.append('gender', input.gender)
        if(input.profilePhoto){
            formData.append('profilePhoto', input.profilePhoto)
        }
        
        // try {
        //     setloading(true)
        //     const res = await axios.post()
        // } catch (error) {
        //    console.log(error); 
        // }
    }
  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto pl-1 sm:pl-10 p-3">
      <section className="flex flex-col gap-6 w-full">
        <h1 className="font-bold text-xl ">Edit Profile</h1>
        <div className="flex items-center justify-between bg-slate-100 rounded-xl p-2 sm:p-4">
            <div className="flex items-center gap-3">
                <Link to={`/profile/${user.id}`} className="w-12 h-12 rounded-full overflow-hidden">
                    <Avatar>
                        <AvatarImage src={user?.profilePicture} alt="post_image" className="w-full h-full"/> 
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Link>
                <div>
                    <h1 className="font-semibold text-sm text-gray-700"><Link to={`/profile/${user.id}`}>{user?.username}</Link></h1>
                    <span className="text-gray-600 text-sm line-clamp-1">{user?.bio || 'bio here...'}</span>
                </div>
            </div>
            <input type="file" ref={imageRef} className=" hidden" />
            <Button onClick={()=>imageRef.current.click()} className='bg-[#0095f9] rounded-xl text-slate-50 hover:bg-[#2b7db4]'>Change photo</Button>
        </div>
      </section>
      <section>
        <h1 className="font-bold text-xl mb-2">Bio</h1>
        <Textarea value={input.bio} onChange={(e)=>setinput({...input , bio:e.target.value})} name='bio' className=' focus-visible:ring-transparent text-slate-500 outline-none border-none rounded-xl bg-slate-100'/>
      </section>
       <section className="flex gap-4 items-center">
            <h1 className="font-bold mb-2">Gender</h1>
            <Select defaultValue={input.gender} onValueChange={SeletChangeHandler}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue  placeholder="Gender" className=""/>
                </SelectTrigger>
                <SelectContent className="z-10 text-slate-800 outline-none border-none rounded-xl bg-slate-100">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="femal">Femal</SelectItem>
                </SelectContent>
            </Select>
       </section>
       <section className="flex justify-end">
            {loading?
             (<Button className='w-fit bg-[#0095F6] hover:bg-[#2a8ccd] text-white rounded-xl'><Loader2 className="mr-2 h-4 w-4 animate-ping"/> Please wait</Button> ) : 
             (<Button onClick={editProfileHandler} className='w-fit bg-[#0095F6] hover:bg-[#2a8ccd] text-white rounded-xl'>Submit</Button> )
            }
       </section>
    </div>
  )
}
