import { AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { UseGetUserProfile } from "@/hooks/UseGetUserProfile";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AtSign } from "lucide-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Profile() {
  const params = useParams()
  const userId = params.id

  UseGetUserProfile(userId)
  const {userProfile} = useSelector(store=>store.auth)
  console.log(userProfile);

  const isLoggedinUserProfile = true
  const isFollowing = true
  
  return (
    <div className="flex flex-col gap-4 max-w-4xl  mx-auto pl-10">
      
      <div className="grid grid-cols-2 items-center justify-center ">
        <section className="flex items-center justify-center h-36 w-36 rounded-full overflow-hidden">
          <Avatar className="h-full w-full">
            <AvatarImage src={userProfile?.profilePicture} alt="dp" className="w-full h-full object-cover"/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </section>
        <section className="mt-5">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span>{userProfile?.username}</span>
              {
                isLoggedinUserProfile ? (
                  <>
                    <Button variant='secondary' className='hover:bg-slate-200 h-8'>Edit profile</Button>
                    <Button variant='secondary' className='hover:bg-slate-200 h-8'>View archive</Button>
                    <Button variant='secondary' className='hover:bg-slate-200 h-8'>Add tools</Button>
                  </>
                ): (
                 isFollowing?(
                  <>
                    <Button variant='secondary' className='rounded-full'>Unfollow</Button>
                    <Button variant='secondary' className='rounded-full'>Message</Button>
                  </>
                 ):(
                  <Button className='bg-[#0095f6] hover:bg-[#287cb4] h-8 rounded-full'>Follow</Button>
                 )
                )
              }
              
            </div>
            <div className="flex gap-4 items-center ">
              <p><span className="font-semibold">{userProfile?.posts.length}</span> posts</p>
              <p><span className="font-semibold">{userProfile?.followers.length}</span> followers</p>
              <p><span className="font-semibold">{userProfile?.following.length}</span> following</p>
            </div>
            <div className="flex flex-col gap-1">
              <Badge variant='secondary'><AtSign/><span className="pl-2">{userProfile?.username}</span></Badge>
              <span>{userProfile?.bio || 'bio here ....'}</span>
              <span>Learn code with patel marnstack style</span>
              <span>Learn code with patel marnstack style</span>
            </div>
          </div>
        </section>
      </div>
    
    </div>
  )
}
