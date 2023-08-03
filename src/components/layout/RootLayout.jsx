import { Outlet } from "react-router-dom"
import RootSidebar from "../ui/Sidebar/RootSidebar"

function RootLayout() {
  return (
    <div>
        <RootSidebar />
        {/* <Outlet/>
        <h1>Footer</h1> */}
    </div>
  )
}

export default RootLayout