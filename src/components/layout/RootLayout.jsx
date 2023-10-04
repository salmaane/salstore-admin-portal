import { Outlet } from "react-router-dom";
import RootSidebar from "../Sidebar/RootSidebar";
import Topbar from "../Topbar/Topbar";
import { Box } from "@mui/material";
import { useState } from "react";

function RootLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false)
  return (
    <Box display="flex" >
      <RootSidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed}
        toggled={toggled}
        setToggled={setToggled}
      />
      <Box 
        sx={{ 
          width:'100%',
          transition: 'all 0.3s'
         }}
      >
        <Topbar setToggled={setToggled} toggled={toggled}/>
        <Box sx={{ p:2.9, minHeight:'91.9vh' }}>
            <Outlet/>
        </Box>
      </Box>
    </Box>
  )
}

export default RootLayout