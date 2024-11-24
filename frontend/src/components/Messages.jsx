import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function Messages({selectedUser}) {
  return (
    <div className=" overflow-y-auto flex-1 p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center mt-5">
            <Avatar className='h-24 w-24'>
                <AvatarImage src={selectedUser?.profilePicture} className=" object-cover"/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{selectedUser?.username}</span>
            <Link to={`/profile/${selectedUser?._id}`} >
                <Button className="h-8 my-2 bg-slate-100" variant='secondary'>View Profile</Button>
            </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((msg, index)=>{
            return(
                <div key={index} className={`flex`}>
                    <div>
                        {msg}
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  )
}
