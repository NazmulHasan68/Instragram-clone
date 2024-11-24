import { useSelector } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Link } from "react-router-dom"
import SuggestedUsers from "./SuggestedUsers"


export default function RightSidebar() {
  const {user} = useSelector((store)=>store.auth)
  return (
    <div className="w-fit my-5 pr-32">
      <div className="flex items-center gap-2">
        <Link to={`/profile/${user?.id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="post_image"/> 
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className="font-semibold"><Link to={`/profile/${user?.id}`}>{user?.username}</Link></h1>
          <span className="text-gray-600 text-sm line-clamp-1">{user?.bio || 'bio here...'}</span>
        </div>
      </div>
      <SuggestedUsers/>
    </div>
  )
}
