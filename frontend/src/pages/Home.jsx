import Feed from "@/components/Feed";
import RightSidebar from "@/components/RightSidebar";
import { UseGetAllPost } from "@/hooks/UseGetAllPost";
import { UseGetSuggestedUser } from "@/hooks/UseGetSuggestedUser";
import { Outlet } from "react-router-dom";

export default function Home() {
  UseGetAllPost()
  UseGetSuggestedUser()
  return (
    <div className="flex gap-4 justify-between w-full ">
      <div className=" basis-2/3 w-full h-screen overflow-y-auto scrollbar-hide">
        <Feed/>
        <Outlet/>
      </div>
      <div className="basis-1/3 w-full">
        <RightSidebar/>
      </div>

    </div>
  )
}
