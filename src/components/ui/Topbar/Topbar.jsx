import {useTheme, Box, IconButton, Badge} from "@mui/material";
import { tokens } from "../../../styles/theme";
// Icons
import SearchBar from "./SearchBar";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ProfileMenu from "./ProfileMenu";



function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box 
      sx={{ 
        width:'100%',
        height:'4rem',
        py:2,
        px:4,
        backgroundColor:colors.gray[100],
        boxShadow: colors.boxShadow,
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
      }}
     >
      <SearchBar/>
      <Box display='flex' justifyContent='space-between' alignItems='center' gap={4}>

        <Box display='flex' justifyContent='space-between' alignItems='center' gap={1}>
          <IconButton><Badge badgeContent={7} color="warning" >
            <NotificationsOutlinedIcon sx={{ color: colors.gray[700], fontSize:26 }} />
          </Badge></IconButton>

          <IconButton><Badge badgeContent={2} color="warning" >
            <ChatBubbleOutlineOutlinedIcon sx={{ color: colors.gray[700], fontSize:22 }} />
          </Badge></IconButton>
        </Box>
        <ProfileMenu/>
          
      </Box>
    </Box>
  )
}

export default Topbar