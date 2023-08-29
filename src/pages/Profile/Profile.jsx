// Mui
import { Avatar, Box, Grid, Paper, Typography, useTheme, Divider, MenuItem } from '@mui/material';
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
import { Link, useLocation } from 'react-router-dom';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import usersInstance from '../../services/users';
import { useState } from 'react';
import { useSignIn } from 'react-auth-kit';

function Profile() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const token = useAuthHeader();
    const {data, error, loading, axiosFetch} = useAxiosFunction(usersInstance);
    
    const [errorAlert, setErrorAlert] = useState(false);
    const handleCloseErrorAlert = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorAlert(false);
    }

    const location = useLocation();
    let user = location.state;
    if(!user) {
        const user_auth = useAuthUser();
        user = user_auth();
    }
    
    const formData = new FormData();
    const handleSubmit = (values, actions) => {
        for(let key in values) {
            values[key] ? formData.append(key, values[key]) : null;
        }

        axiosFetch({
            url:'/' + user.id + '?_method=patch',
            method:'post',
            headers:{
                'Authorization' : token(),
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
            handleError: () => setErrorAlert(true),
            handleResponse: (data) => {
                // signIn({
                //     token: data.token,
                //     expiresIn: data.expiresIn,
                //     tokenType: 'Bearer',
                //     authState: data,
                // })
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
                    src={user?.profile} 
                    sx={{ width:100, height:100, border:'2px solid', borderColor: colors.indigo[500], cursor:'pointer' }}
                />
                <Box display='flex' alignItems='center' flexDirection='column'>
                    <Typography variant='h4' fontWeight='bold'>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</Typography>
                    <Typography variant='h6'>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Typography>
                </Box>
                <Typography color={colors.indigo[500]} variant='body2'>account created {accountCreated(user.created_at)}</Typography>
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
                { user?.social_links.facebook ? 
                    <Link to={user?.social_links.facebook} target='blank' replace style={{ color:'#222' }}>
                    <Box display='flex' gap={1} alignItems='center' sx={{ cursor:'pointer', '&:hover':{textDecoration:'underline'} }}>
                        <FacebookIcon sx={{ color: colors.primary[500] }}/>
                        <Typography>Facebook</Typography>
                    </Box>
                    </Link>
                : null}
                { user?.social_links.instagram ? 
                    <Link to={user?.social_links.instagram} target='blank' replace style={{ color:'#222' }}>
                    <Box display='flex' gap={1} sx={{ cursor:'pointer', '&:hover':{textDecoration:'underline'} }}>
                        <InstagramIcon sx={{ color: colors.primary[500] }} />
                        <Typography>Instagram</Typography>
                    </Box>
                    </Link>
                : null}
                { user?.social_links.twitter ? 
                    <Link to={user?.social_links.twitter} target='blank' replace style={{ color:'#222' }}>
                    <Box display='flex' gap={1} sx={{ cursor:'pointer', '&:hover':{textDecoration:'underline'} }}>
                        <TwitterIcon sx={{ color: colors.primary[500] }}/>
                        <Typography>Twitter</Typography>
                    </Box>
                    </Link>
                : null}
                { user?.social_links.linkedin ? 
                    <Link to={user?.social_links.linkedin} target='blank' replace style={{ color:'#222' }}>
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
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        old_password:'',
                        password:'',
                        password_confirmation:'',
                        facebook: user.social_links.facebook || '',
                        instagram: user.social_links.instagram || '',
                        linkedin: user.social_links.linkedin || '',
                        twitter: user.social_links.twitter || '',
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