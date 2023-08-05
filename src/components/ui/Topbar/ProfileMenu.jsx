import {useTheme ,Box, Avatar, Menu, MenuItem, Divider, IconButton, Tooltip, Badge, Typography, MenuList} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { tokens } from "../../../styles/theme";
// Icons
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
// react-auth-kit 
import { useSignOut } from 'react-auth-kit';

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

function ProfileMenu() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = useSignOut();
  const handleLogout = ()  => signOut();

  return (
    <>
    <IconButton onClick={handleClick}>
        <Tooltip title="Account Settings">
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
            >
                <Avatar alt="profile"
                    sx={{ width:'2.2rem', height:'2.2rem', cursor:'pointer' }}
            />
            </StyledBadge>
        </Tooltip>
    </IconButton>
    <Menu 
        disableScrollLock
        disableEnforceFocus
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
        <Box sx={{ 
            display:'flex',
            alignItems:'center',
            flexDirection:'column',
            p:2,
            mt:'-8px',
            mb: 1,
            backgroundImage: 'linear-gradient(0deg,rgba(0,0,0,0.3), rgba(0,0,0,0.5), rgba(0,0,0,0.7)) ,url(/assets/images/anime-streets.jpg)',
            backgroundSize:'cover',
        }}>
            <Typography variant='h3' sx={{ color:colors.gray[100], fontSize:'bold'}}>Salmane El Mourtaji</Typography>
            <Typography variant='subtitle2' color={colors.gray[100]}>Admin</Typography>
        </Box>
        <MenuItem onClick={handleClose}>
          My Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={ ()=> {handleClose(); handleLogout();}}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
    </Menu>
    </>
  )
}

export default ProfileMenu