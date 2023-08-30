import { Grid, Paper, Typography, Divider, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// Formik
import { Field, Form, Formik } from 'formik';
import { TextField } from "formik-mui";
import * as yup from 'yup';
// Components
import SnackbarAlert from '../../components/SnackbarAlert/SnackbarAlert';
import SlideTransition from '../../components/Dialog/SlideTransition';
// Hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';

function ProfileUpdateForm({loadedUser,setLoadedUser, error, loading, axiosFetch}) {
    const navigate = useNavigate();
    const token = useAuthHeader();

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

  return (
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
            alertKey={loadedUser?.id}
            TransitionComponent={SlideTransition}
        />
</Paper>
  )
}

export default ProfileUpdateForm