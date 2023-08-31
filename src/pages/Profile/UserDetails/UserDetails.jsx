// MUI
import { IconButton, Avatar, Box, Paper, Typography, useTheme, Skeleton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// Hooks
import { tokens } from '../../../styles/theme';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// Components
import UpdateProfileDialog from './UpdateProfileDialog';

function UserDetails({loadedUser, loading, picture, setPicture, setLoadedUser}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isOpen, setIsOpen] = useState(false);



  return (
    <Box display='flex' gap={2} flexDirection='column' height='100%'>
            <Paper 
                elevation={0} 
                sx={{
                    py:4, px:2,
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    gap:2,
                }}
            >
                <IconButton onClick={()=> setIsOpen(true)}>
                    <Avatar 
                        alt='profile'
                        src={loadedUser?.profile} 
                        sx={{ width:100, height:100, border:'2px solid', borderColor: colors.indigo[500], cursor:'pointer' }}
                    />
                </IconButton>
                <Box display='flex' alignItems='center' flexDirection='column' width='100%'>
                    {loading ?
                        <Box width='100%' display='flex' alignItems='center' flexDirection='column'>
                            <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', width:'60%', textAlign:'center' }}/>
                            <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', width:'40%' }}/>
                        </Box>
                    : 
                    <>
                        <Typography variant='h4' fontWeight='bold'>{loadedUser?.name ? loadedUser?.name.charAt(0).toUpperCase() + loadedUser?.name.slice(1) : null}</Typography>
                        <Typography variant='h6'>{loadedUser?.role ? loadedUser?.role.charAt(0).toUpperCase() + loadedUser?.role.slice(1) : null}</Typography>
                    </>
                    }
                </Box>
                <Typography color={colors.indigo[500]} variant='body2'>account created {accountCreated(loadedUser?.created_at)}</Typography>
            </Paper>
            <Paper
                elevation={0} 
                sx={{
                    p:2,
                    display:'flex',
                    flexDirection:'column',
                    gap:2,
                    height:'100%'
                }}
            >
                <Typography variant='h5' fontWeight='bold'>Accounts</Typography>
                { loadedUser?.social_links.facebook ? 
                    <Link to={loadedUser?.social_links.facebook} target='blank' replace style={{ color:'#222' }}>
                    <Box display='flex' gap={1} alignItems='center' sx={{ cursor:'pointer', '&:hover':{textDecoration:'underline'} }}>
                        <FacebookIcon sx={{ color: colors.primary[500] }}/>
                        <Typography>Facebook</Typography>
                    </Box>
                    </Link>
                : null}
                { loadedUser?.social_links.instagram ? 
                    <Link to={loadedUser?.social_links.instagram} target='blank' replace style={{ color:'#222' }}>
                    <Box display='flex' gap={1} sx={{ cursor:'pointer', '&:hover':{textDecoration:'underline'} }}>
                        <InstagramIcon sx={{ color: colors.primary[500] }} />
                        <Typography>Instagram</Typography>
                    </Box>
                    </Link>
                : null}
                { loadedUser?.social_links.twitter ? 
                    <Link to={loadedUser?.social_links.twitter} target='blank' replace style={{ color:'#222' }}>
                    <Box display='flex' gap={1} sx={{ cursor:'pointer', '&:hover':{textDecoration:'underline'} }}>
                        <TwitterIcon sx={{ color: colors.primary[500] }}/>
                        <Typography>Twitter</Typography>
                    </Box>
                    </Link>
                : null}
                { loadedUser?.social_links.linkedin ? 
                    <Link to={loadedUser?.social_links.linkedin} target='blank' replace style={{ color:'#222' }}>
                    <Box display='flex' gap={1} sx={{ cursor:'pointer', '&:hover':{textDecoration:'underline'} }}>
                        <LinkedInIcon sx={{ color: colors.primary[500] }}/>
                        <Typography>LinkedIn</Typography>
                    </Box>
                    </Link>
                : null}
            </Paper>
            <UpdateProfileDialog
                isOpen={isOpen}
                handleClose={() => setIsOpen(false)}
                state={loadedUser}
                picture={picture}
                setPicture={setPicture}
                setLoadedUser={setLoadedUser}
            />
    </Box>
  )
}

function accountCreated(creationDate) {
    const accountDate = new Date(creationDate);
    const currentDate = new Date();
    let years = currentDate.getFullYear() - accountDate.getFullYear();
    let months = currentDate.getMonth() - accountDate.getMonth();
    let days = currentDate.getDate() - accountDate.getDate();

    if(years > 0) {
        return years == 1 ? "1 year ago" : years + " years ago" ;
    }
    if(months > 0) {
        return months == 1 ? "1 month ago" : months + " months ago" ;
    }
    if(days > 0) {
        return days == 1 ? "1 day ago" : days + " days ago" ;
    }
    return "today";
}

export default UserDetails