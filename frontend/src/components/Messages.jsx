import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { UseGetAllMessage } from "@/hooks/UseGetAllMessage";
import { useGetRTM } from "@/hooks/useGetRTM";

export default function Messages({ selectedUser }) {
  useGetRTM()
  UseGetAllMessage(); 
  const { messages } = useSelector((store) => store.chat); 
  const { user } = useSelector((store) => store.auth); 


  
  if (!selectedUser) {
    return (
      <p className="text-center text-gray-500">Select a user to view messages.</p>
    );
  }

  return (
    <div className="overflow-y-auto scrollbar-hide flex-1 p-4">
      {/* Header */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center mt-5">
          <Avatar className="h-24 w-24">
            <AvatarImage src={selectedUser?.profilePicture} className="object-cover" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-medium mt-2">{selectedUser?.username}</span>
          <Link to={`/profile/${selectedUser?._id}`}>
            <Button className="h-8 my-2 bg-slate-100" variant="secondary">
              View Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-1 mt-4">
        {messages?.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === user?.id ? "justify-end" : "justify-start"
              }`}
            >
              <div className={`p-2 max-w-xs rounded-lg flex items-start gap-2 `}>
                {
                  msg.senderId === user?.id ? 
                  <>
                    <p className="text-sm white py-2 px-4 bg-blue-500 text-white rounded-tr-xl rounded-l-[5px]">{msg.textMessage}</p>
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img src={user?.profilePicture} className="w-full h-full" alt="user"/>
                    </div> 
                  </>
                  :<>
                    <div className="w-8 h-8 rounded-full overflow-hidden ">
                     <img src={selectedUser?.profilePicture} className="w-full h-full" alt="user"/>
                    </div>
                    <p className="text-sm white py-2 px-4 bg-teal-600 text-gray-300  rounded-bl-xl rounded-r-[5px]">{msg.textMessage}</p>
                  </>
                 
                }
               
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet. Say hi!</p>
        )}
      </div>
    </div>
  );
}
