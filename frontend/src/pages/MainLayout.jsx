import LeftSidebar from "@/components/LeftSidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex gap-4 mx-auto max-w-7xl">
      <div>
       <LeftSidebar/>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}
