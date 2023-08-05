import { Outlet } from "react-router-dom";
import RootSidebar from "../ui/Sidebar/RootSidebar";
import Topbar from "../ui/Topbar/Topbar";
import { Box } from "@mui/material";
import { useState } from "react";

function RootLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState();
  return (
    <Box display="flex" >
      <RootSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed}/>
      <Box 
        sx={{ 
          width:'100%',
          pl: sidebarCollapsed ? '80px' : '272px',
          transition: 'all 0.3s'
         }}
      >
        <Topbar/>
      </Box>
    </Box>
  )
}

export default RootLayout