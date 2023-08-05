import {useTheme, Box, IconButton, Badge, Avatar, Divider} from "@mui/material";
import { tokens } from "../../../styles/theme";
import { styled } from '@mui/material/styles';
// Icons
import SearchBar from "./SearchBar";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px rgba(0,0,0,0.1)`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

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
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src="assets\images\blank-profile.png" 
            sx={{ width:'2.2rem', height:'2.2rem', cursor:'pointer' }}
          />
        </StyledBadge>
          
      </Box>
    </Box>
  )
}

export default Topbar