import { UseGetUserProfile } from "@/hooks/UseGetUserProfile";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Profile() {
  const params = useParams()
  const userId = params.id
  
  UseGetUserProfile(userId)
  const {userProfile} = useSelector(store=>store.auth)
  console.log(userProfile);
  
  return (
    <div>
      <Avatar>
        <AvatarImage/>
      </Avatar>
    </div>
  )
}
