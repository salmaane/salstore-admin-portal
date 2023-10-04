import {useTheme, Box, IconButton, Badge} from "@mui/material";
import { tokens } from "../../styles/theme";
import useMediaQuery from '@mui/material/useMediaQuery';
// Icons
import SearchBar from "./SearchBar";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ProfileMenu from "./ProfileMenu";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';



function Topbar({toggled, setToggled}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const matches = useMediaQuery('(min-width:768px)');

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
        position:'sticky',
        top:'0',
        zIndex:9,
      }}
     >
      {matches && <SearchBar/>}
      {toggled && 
        <IconButton 
          sx={{ 
            position:'fixed',
            top:'1%',
            right:'2%',
            zIndex:9,
           }}
          onClick={()=> setToggled(false)}>
          <CloseIcon sx={{ color: colors.gray[900], fontSize:33 }}/>
        </IconButton>
      }
      <Box display='flex' justifyContent='space-between' alignItems='center' gap={4} sx={{ flex: !matches ? 1 : 'initial' }}>

        <Box display='flex' justifyContent='space-between' alignItems='center' gap={1}>
          {!matches && 
            <IconButton onClick={() => setToggled(true)}>
              <MenuIcon sx={{ color: colors.gray[700], fontSize:26 }}/>
            </IconButton>
          }

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