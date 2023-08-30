// Mui
import { Avatar, Box, Grid, Paper, Typography, useTheme, Divider, MenuItem, Skeleton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { tokens } from '../../styles/theme';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// Formik
import { Field, Form, Formik } from 'formik';
import { TextField } from "formik-mui";
import * as yup from 'yup';
// components
import Header from '../../components/Header/Header';
import SnackbarAlert from '../../components/SnackbarAlert/SnackbarAlert';
import SlideTransition from '../../components/Dialog/SlideTransition';
// Hooks
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import usersInstance from '../../services/users';
import { useEffect, useState } from 'react';

function Profile() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const token = useAuthHeader();
    const navigate = useNavigate();
    const {data, error, loading, axiosFetch} = useAxiosFunction(usersInstance);
    const [loadedUser, setLoadedUser] = useState();

    const [errorAlert, setErrorAlert] = useState(false);
    const handleCloseErrorAlert = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorAlert(false);
    }

    const [openAlert, setOpenAlert] = useState(false);
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    }
    
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

    const formData = new FormData();
    const handleSubmit = (values, actions) => { 
        for(let key in values) {
            values[key] ? formData.append(key, values[key]) : null;
        }

        axiosFetch({
            url:'/' + loadedUser?.id + '?_method=patch',
            method:'post',
            headers:{
                'Authorization' : token(),
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
            handleError: () => setErrorAlert(true),
            handleResponse: (data) => {
                setLoadedUser(data);
                navigate('', {state: data});
                setOpenAlert(true);
            },
        });

        actions.resetForm();
        for(let key in values) {
            formData.delete(key);
        }
    }

    const FORM_VALIDATION = yup.object().shape({
        name: yup.string(),
        email: yup.string().email(),
        role: yup.string(),
        instagram: yup.string().url(),
        facebook: yup.string().url(),
        twitter: yup.string().url(),
        linkedin: yup.string().url(),
        old_password: yup.string(),
        password: yup.string()
                    .when('old_password', {
                        is: (oldPassword) => oldPassword && oldPassword.length > 0,
                        then: () =>  yup.string().required('New password is required')
                        .min(8, 'password is too short - should be 8 chars minimum'),
                        otherwise: () => yup.string().min(8, 'password is too short - should be 8 chars minimum'),
                    }),
        password_confirmation: yup.string().when('password', {
            is: (newPassword) => newPassword && newPassword.length > 0,
            then: () => yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
            otherwise: () => yup.string(),
        }),
    });

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
            <Paper elevation={0} sx={{ p:2, display:'flex', alignItems:'center', flexDirection:'column', gap:2, height:'100%'}}>
                <Typography variant='h4'>Account informations</Typography>
                <Formik
                    enableReinitialize
                    validationSchema={FORM_VALIDATION}
                    initialValues={{ 
                        name: loadedUser?.name || '',
                        email: loadedUser?.email || '',
                        role: loadedUser?.role || 'user',
                        old_password:'',
                        password:'',
                        password_confirmation:'',
                        facebook: loadedUser?.social_links.facebook || '',
                        instagram: loadedUser?.social_links.instagram || '',
                        linkedin: loadedUser?.social_links.linkedin || '',
                        twitter: loadedUser?.social_links.twitter || '',
                    }}
                    onSubmit={handleSubmit}
                >
                    {(props) => (
                        <Form autoComplete='off'>
                            <Grid container gap={2}>
                                <Grid item xs={12}>
                                    <Field size='small' name='name' component={TextField} fullWidth label="Full Name"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field size='small' name='email' component={TextField} fullWidth label='Email'/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field size='small' select name='role' component={TextField} fullWidth label='Role'>
                                        <MenuItem value='admin'>Admin</MenuItem>
                                        <MenuItem value='user'>User</MenuItem>
                                    </Field>
                                </Grid>
                                <Divider sx={{width:'100%'}}>Change Password ?</Divider>
                                <Grid item xs={12}>
                                    <Field size='small' name='old_password' component={TextField} fullWidth label='Old password' />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field size='small' name='password' component={TextField} fullWidth label='New password' />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field size='small' name='password_confirmation' component={TextField} fullWidth label='Confirm password' />
                                </Grid>
                                <Divider sx={{width:'100%'}}>Accounts links</Divider>
                                <Grid item xs={12}>
                                    <Field size='small' name='facebook' component={TextField} fullWidth label='Facebook' />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field size='small' name='instagram' component={TextField} fullWidth label='Instagram' />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field size='small' name='linkedin' component={TextField} fullWidth label='LinkedIn' />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field size='small' name='twitter' component={TextField} fullWidth label='Twitter' />
                                </Grid>
                                <Grid item xs={12} >
                                    <LoadingButton variant="outlined" fullWidth loading={loading} type='sumbit'>
                                     Save
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                {error?.status === 422 ? <SnackbarAlert
                    title={error?.data.message}
                    openAlert={errorAlert}
                    handleCloseAlert={handleCloseErrorAlert}
                    alertKey={error?.data.message}
                    TransitionComponent={SlideTransition}
                    severity="error"
                /> : null   }
                <SnackbarAlert
                    title='profile updated successfully'
                    openAlert={openAlert}
                    handleCloseAlert={handleCloseAlert}
                    alertKey={data?.id}
                    TransitionComponent={SlideTransition}
                />
            </Paper>
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