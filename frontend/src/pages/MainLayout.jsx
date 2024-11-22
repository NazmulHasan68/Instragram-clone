import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex gap-4">
      <div>
        sidebar 
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}
