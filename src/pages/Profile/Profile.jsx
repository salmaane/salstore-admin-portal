// Mui
import { Avatar, Box, Grid, Paper, Typography, useTheme, Skeleton } from '@mui/material';
import { tokens } from '../../styles/theme';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// components
import Header from '../../components/Header/Header'
import ProfileUpdateForm from './ProfileUpdateForm';
// Hooks
import { useEffect, useState } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { Link, useLocation } from 'react-router-dom';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import usersInstance from '../../services/users';

function Profile() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const token = useAuthHeader();
    const {data, error, loading, axiosFetch} = useAxiosFunction(usersInstance);
    const [loadedUser, setLoadedUser] = useState();
    
    const location = useLocation();
    const auth_state = useAuthUser();
    let user = location.state;
    useEffect(() => {
        if(!user) {
            axiosFetch({
                url:'/' + auth_state().id,
                method:'get',
                headers:{
                    'Authorization' : token(),
                },
                handleResponse: (data) => {setLoadedUser(data)},
            });
        } else {
            setLoadedUser(user);
        }
    },[]);

    return (
    <Grid container gap={2}>
        <Grid item xs={12}>
            <Header title='Profile' />
        </Grid>
        <Grid item xs={12} md={4} display='flex' gap={2} flexDirection='column'>
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
                <Avatar 
                    alt='profile' 
                    src={loadedUser?.profile} 
                    sx={{ width:100, height:100, border:'2px solid', borderColor: colors.indigo[500], cursor:'pointer' }}
                />
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
        </Grid>
        <Grid item xs={12} md={7.7} >
            <ProfileUpdateForm
                loadedUser={loadedUser}
                setLoadedUser={setLoadedUser}
                error={error}
                loading={loading}
                axiosFetch={axiosFetch}
            />
        </Grid>
    </Grid>
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

export default Profile