import { Outlet } from "react-router-dom";
import RootSidebar from "../ui/Sidebar/RootSidebar";
import Topbar from "../ui/Topbar/Topbar";
import { Box } from "@mui/material";
import { useState } from "react";

function RootLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState();

  return (
    <Box display="flex" >
      <RootSidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed}
      />
      <Box 
        sx={{ 
          width:'100%',
          transition: 'all 0.3s'
         }}
      >
        <Topbar/>
        <Box sx={{ 
          p:2.9,
          minHeight:'91.9vh',
         }}>
            <Outlet/>
        </Box>
      </Box>
    </Box>
  )
}

export default RootLayout