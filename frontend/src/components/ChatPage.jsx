import { useDispatch, useSelector } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { setselectedUser } from "@/redux/authSlice"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { MessageCircle, MessageCircleCode } from "lucide-react"
import Messages from "./Messages"

export default function ChatPage() {
    const dispatch = useDispatch()
    const {user, suggestedUsers, selectedUser} = useSelector(store=>store.auth)
    const {onlineUsers} = useSelector(store=>store.chat)
 
  return (
    <div className="flex h-screen">
      <section className="w-[20%] sm:w-[25%] p-3 border-r border-r-gray-300">
        <h1 className="font-bold mb-4 px-3  text-xl ">{user?.username}</h1>
        <hr className="mb-4 border-gray-300"/>
        <div className=" overflow-y-auto h-[80vh]">
            {
                suggestedUsers.map((suggestedUser, index)=>{
                    const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(suggestedUser?._id);
                    return (
                        <div key={index} onClick={()=>dispatch(setselectedUser(suggestedUser))} className="flex gap-3 items-center p-2 hover:bg-gray-50 cursor-pointer">
                            <Avatar>
                                <AvatarImage src={suggestedUser?.profilePicture} className=' object-cover'/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-medium ">{suggestedUser?.username}</span>
                                <span className={`text-xs font-semibold ${isOnline ? "text-green-600" : "text-red-600"}`}>{isOnline ? "Online" : "Offline"}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
      </section>
      {
        selectedUser ? (
            
            <section className="flex-1 flex flex-col w-full ">
                <div className="flex gap-3 items-center px-3 py-2 border-b border-b-gray-300 sticky top-0 bg-white z-10">
                    <Avatar>
                        <AvatarImage src={selectedUser?.profilePicture} className=' object-cover'/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium ">{selectedUser?.username}</span>
                        {/* <span className={`text-xs font-semibold ${isOnline ? "text-green-600" : "text-red-600"}`}>{isOnline ? "Online" : "Offline"}</span> */}
                    </div>
                </div>
               
                <Messages selectedUser={selectedUser}/>
                <div className="flex items-center p-4 ">
                    <Input type='text' className='flex-1 outline-none border-none bg-slate-200 text-gray-700 mr-2 focus-visible:ring-transparent' placeholder="Messages"/>
                    <Button>Send</Button>
                </div>
            </section>
        ) :(
            <div className="flex flex-col items-center justify-center mx-auto text-slate-600 ">
                <MessageCircleCode className="w-32 h-32 my-4"/>
                <h1>Your messages</h1>
                <span>Send a message to start a chat.</span>
            </div>
        )
      }
    </div>
  )
}
