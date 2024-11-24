import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setselectedUser } from "@/redux/authSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessageCircleCode } from "lucide-react";
import Messages from "./Messages";
import { useEffect, useState } from "react";
import axios from "axios";
import { setMessages } from "@/redux/chatSlice";

export default function ChatPage() {
  const dispatch = useDispatch();
  const { user, suggestedUsers, selectedUser } = useSelector((store) => store.auth);
  const { onlineUsers , messages} = useSelector((store) => store.chat);
  const [textMessage, setTextMessage] = useState(""); 

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${receiverId}`,
        { textMessage }, 
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("New message response:", res.data.newMessage);

      if (res.data.success) {
        setTextMessage(""); 
        dispatch(setMessages([...messages,  res.data.newMessage]));
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setselectedUser(null)); 
    };
  }, [dispatch]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <section className="w-[20%] sm:w-[25%] p-3 border-r border-gray-300">
        <h1 className="font-bold mb-4 px-3 text-xl">{user?.username}</h1>
        <hr className="mb-4 border-gray-300" />
        <div className="overflow-y-auto h-[80vh]">
          {suggestedUsers &&
            suggestedUsers.map((suggestedUser, index) => {
              const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(suggestedUser?._id);
              return (
                <div
                  key={index}
                  onClick={() => dispatch(setselectedUser(suggestedUser))}
                  className="flex gap-3 items-center p-2 hover:bg-gray-50 cursor-pointer"
                >
                  <Avatar>
                    <AvatarImage src={suggestedUser?.profilePicture} className="object-cover" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{suggestedUser?.username}</span>
                    <span
                      className={`text-xs font-semibold ${
                        isOnline ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* Chat Section */}
      {selectedUser ? (
        <section className="flex-1 flex flex-col w-full">
          {/* Chat Header */}
          <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10">
            <Avatar>
              <AvatarImage src={selectedUser?.profilePicture} className="object-cover" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{selectedUser?.username}</span>
            </div>
          </div>


          <Messages selectedUser={selectedUser} />

          <div className="flex items-center p-4">
            <Input
              type="text"
              value={textMessage} // Fixed binding to match state name
              onChange={(e) => setTextMessage(e.target.value)} // Updated to match state
              className="flex-1 outline-none border-none bg-slate-200 text-gray-700 mr-2 focus-visible:ring-transparent"
              placeholder="Type a message..."
            />
            <Button onClick={() => sendMessageHandler(selectedUser?._id)}>Send</Button>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto text-slate-600">
          <MessageCircleCode className="w-32 h-32 my-4" />
          <h1>Your Messages</h1>
          <span>Send a message to start a chat.</span>
        </div>
      )}
    </div>
  );
}
