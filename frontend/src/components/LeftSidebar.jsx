import { Heart, Home, icons, LogOut, Map, MessageCircle, PlaneIcon, PlusSquare, Search, TrendingUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setAuthUser } from "@/redux/authSlice"
import { useState } from "react"
import Createpost from "./Createpost"
import { setPosts, setSelectedPost } from "@/redux/postSlice"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"


export default function LeftSidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector(state =>state.auth)
  const [open , setopen] = useState(false)
  const { likeNotification } = useSelector(store => store.realTimeNotification)



  const sidebarItems = [
    { icon: <Home/>, text: "Home" },
    { icon: <Search/>, text: "Search" },
    { icon: <TrendingUp/>, text: "Explore" },
    { icon: <MessageCircle/>, text: "Messages" },
    { icon: <Heart/>, text: "Notification" },
    { icon: <Map/>, text: "Place" },
    { icon: <PlaneIcon/>, text: "Travel" },
    { icon: <PlusSquare/>, text: "Create" },
    { 
        icon: (
            <Avatar className='w-6 h-6'>
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        )
        , text: "Profile" 
    },
    { icon: <LogOut/> , text:"Logout"}

]

  const sidebarHandler =(textType)=>{
    if(textType === 'Logout') logoutHnadler()
    if(textType === 'Create') createPostHandler()
    if(textType === 'Profile') {
      navigate(`/profile/${user?.id}`)
    }
    if(textType === 'Home') navigate('/')
    if(textType === 'Messages') navigate('/chat')
  }

  const logoutHnadler = async()=>{
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`,{withCredentials:true})
      if(res.data.success){
        navigate('/login')
        dispatch(setSelectedPost(null))
        dispatch(setPosts(null))
        dispatch(setAuthUser(null))
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const createPostHandler = () =>{
    setopen(true)
  }

  return (
    <div className="z-10 px-2 border-r border-gray-400 h-screen">
      <div className="flex flex-col">
      <h1 className="sm:text-3xl font-semibold py-6 p-2 cursor-pointer hidden sm:block">Instragram</h1>
      <h1 className="sm:text-5xl font-bold py-4 cursor-pointer sm:hidden">Ins</h1>
        <div >
        {
          sidebarItems.map((item, index)=>{
              return (
                  <div onClick={()=>sidebarHandler(item.text)} key={index} className="flex gap-3 items-center relative hover:bg-gray-100 cursor-pointer rounded-lg p-2 sm:pr-12 my-2">
                      <div>{item.icon}</div>
                      <div className="hidden sm:block">{item.text}</div>
                      {
                        item.text === 'Notification' && likeNotification.length > 0 && (
                          <Popover>
                            <PopoverTrigger asChild>
                                <Button size='icon' className="rounded-full bg-red-600 text-white h-5 w-5 absolute bottom-6 left-6">{likeNotification.length}</Button>
                            </PopoverTrigger>
                            <PopoverContent className='bg-white '>
                              <div>
                                {
                                  likeNotification.length === 0 ? (<p>No new notification</p>) : (
                                    likeNotification.map((notification, index)=>{
                                      return (
                                        <div key={index} className="flex items-center gap-2 mt-1 border-b border-b-gray-200">
                                          <Avatar>
                                            <AvatarImage src={notification?.userDetails?.profilePicture}/>
                                            <AvatarFallback>CN</AvatarFallback>
                                          </Avatar>
                                          <p className="text-xs"><span className="font-bold text-black">{notification?.userDetails?.username}liked your post</span></p>
                                        </div>
                                      )
                                    })
                                  )
                                }
                              </div>
                            </PopoverContent>
                          </Popover>
                        )
                      }
                  </div>
              )
          })
        }
      </div>
      </div>
      <Createpost open={open} setopen={setopen}/>
    </div>
  )
}
