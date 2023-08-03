import { tokens } from '../../../styles/theme';
import { Link, useNavigate } from 'react-router-dom';
// Mui
import { Box, Typography, Container, useTheme, Link as MuiLink, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {Alert, Snackbar} from '@mui/material';
// Formik
import { TextField } from 'formik-mui';
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
// Axios
import useAxiosFunction from '../../../context/useAxiosFunction';
import authInstance from '../../../services/auth';
// React-Auth-Kit
import { useSignIn } from 'react-auth-kit';
import { useState } from 'react';


function LoginForm() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, error, loading, axiosFetch] = useAxiosFunction(authInstance);
    const signIn = useSignIn();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const FORM_VALIDATION = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    });

    // Error Alert settings
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }
    
    const onSubmit = (values, actions) => {
        const handleResponse = (data) => {
                signIn({
                    token: data.token,
                    expiresIn: data.expiresIn,
                    tokenType: 'Bearer',
                    authState: data.user,
                })
                navigate('/');
        }
        const handleError = () => setOpen(true);

        axiosFetch({
            method: 'post',
            data: values,
            handleResponse,
            handleError
        });

        actions.setSubmitting(false);
        actions.resetForm();
    }
    
  return (
      <Container sx={{
          overflow: 'hidden',
          backgroundColor: colors.gray[100],
          borderRadius: 1,
          boxShadow: tokens().boxShadow,
      }} disableGutters={true} maxWidth="xs">

        <Box sx={{
            backgroundColor: colors.primary[400],
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 2,
        }}>
            <Typography variant='h4' color='white' fontWeight='bold'>
                Welcome back !
            </Typography>
        </Box>

          <Snackbar 
            open={open} autoHideDuration={6000}
            onClose={handleClose} key={error?.data?.message}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Email or Password are incorrect!
            </Alert>
        </Snackbar>

        <Formik
            initialValues={{ email:'', password:'' }}
            validationSchema={FORM_VALIDATION}
            onSubmit={onSubmit}
        >
            {() => (
            <Form autoComplete='off'>
                <Grid container spacing={4} direction="column" sx={{ px:2.3, py:4 }}>
                    <Grid item >
                        <Field name="email" component={TextField} type="email" label="Email" fullWidth/>
                    </Grid>
                    <Grid item >
                        <Field name="password" component={TextField} type="password" label="Password" fullWidth/>
                    </Grid>
                    <Grid item >
                        <LoadingButton type="submit" variant="contained"
                            loading={loading} fullWidth
                        >
                            <span>Log in</span>
                        </LoadingButton>
                    </Grid>
                    <Grid item alignSelf="center" >
                        <MuiLink sx={{ '&:hover': { color: colors.primary[900] }, fontSize: 15}}
                            component={Link}
                            to="/password-reset"
                            underline='none'
                            color={colors.darkWhite[800]}>
                            Forget password ?
                        </MuiLink>
                    </Grid>
                </Grid>
            </Form>
            )}
        </Formik>

      </Container>
  )
}


export default LoginForm