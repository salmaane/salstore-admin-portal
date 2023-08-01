import { tokens } from '../../../styles/theme';
import { Link } from 'react-router-dom';
// Mui
import { Box, Typography, Container, useTheme, Link as MuiLink, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// Formik
import { TextField } from 'formik-mui';
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
// Axios
import useAxiosFunction from '../../../context/useAxiosFunction';
import authInstance from '../../../services/auth';

function LoginForm() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, error, loading, axiosFetch] = useAxiosFunction(authInstance);

    const FORM_VALIDATION = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    });

    const onSubmit = (values, actions) => {

        axiosFetch({
            method: 'post',
            data: values
        });
        actions.setSubmitting(false);
        actions.resetForm();
        
    }

    console.log(data);
    console.log(error);

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

        <Formik
            initialValues={{ email:'', password:'' }}
            validationSchema={FORM_VALIDATION}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
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