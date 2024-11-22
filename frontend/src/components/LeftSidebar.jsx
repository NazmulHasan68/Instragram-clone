import { Heart, Home, icons, LogOut, Map, MessageCircle, PlaneIcon, PlusSquare, Search, TrendingUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setAuthUser } from "@/redux/authSlice"


export default function LeftSidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector(state =>state.auth)

  const logoutHnadler = async()=>{
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`,{withCredentials:true})
      if(res.data.success){
        navigate('/login')
        dispatch(setAuthUser(null))
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

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
                </div>
            )
        })
      }
      </div>
      </div>
    </div>
  )
}
