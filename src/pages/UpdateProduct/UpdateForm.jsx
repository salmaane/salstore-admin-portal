import { Grid, Paper, MenuItem, Button} from "@mui/material"
import { LoadingButton } from "@mui/lab";
import { useAuthHeader } from "react-auth-kit";
import { useState } from "react";
// Formik
import { Formik, Form, Field } from "formik"
import { TextField } from "formik-mui"
import * as yup from 'yup';
// Axios
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axiosInstance from '../../services/sneakers'
// components
import UploadButton from "../../components/UploadButton/UploadButton";
import SlideTransition from '../../components/Dialog/SlideTransition';
import SnackbarAlert from "../../components/SnackbarAlert/SnackbarAlert";

function UpdateForm({productData, id}) {
    const [openAlert, setOpenAlert] = useState(false);
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    }

    const [errorAlert, setErrorAlert] = useState(false);
    const handleCloseErrorAlert = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorAlert(false);
    }

    const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
    const FORM_VALIDATION = yup.object().shape({
        title: yup.string(),
        gender: yup.string(),
        colorway: yup.string(),
        brand: yup.string(),
        retailPrice: yup.number(),
        releaseDate: yup.date(),
        thumbUrl: yup.mixed()
        .test("is-valid-size", "Max allowed size is 5Mb", value => value===undefined ? true : (value && value.size) <= MAX_IMAGE_SIZE ),
        smallImageUrl: yup.mixed()
        .test("is-valid-size", "Max allowed size is 5Mb", value => value===undefined ? true : (value && value.size) <= MAX_IMAGE_SIZE),
        imageUrl: yup.mixed()
        .test("is-valid-size", "Max allowed size is 5Mb", value => value===undefined ? true : (value && value.size) <= MAX_IMAGE_SIZE),
    });

    const {data, loading, error, axiosFetch} = useAxiosFunction(axiosInstance);
    const token = useAuthHeader();
    const formData = new FormData();

    function handleSubmit(values, actions) {
        for(const key in values) {
            values[key] ? formData.append(key, values[key]) : null;
        }
        axiosFetch({
            url:'/' + id + '?_method=patch',
            method:'post',
            headers:{
                'Authorization' : token(),
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
            handleResponse: () => setOpenAlert(true),
            handleError: () => setErrorAlert(true),
        });
        actions.resetForm();
    };

  return (
    <Paper elevation={0} sx={{ p:2 }}>
        <Formik
            enableReinitialize
            initialValues={{
                title: productData?.title || '',
                brand: productData?.brand || '',
                gender:productData?.gender || '',
                colorway: productData?.colorway || '',
                releaseDate: productData?.releaseDate || '',
                retailPrice: productData?.retailPrice || '',
                thumbUrl: '',
                smallImageUrl: '',
                imageUrl: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={FORM_VALIDATION}
        >
            {(props)=> (
                <Form autoComplete='off'>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <Field name='title' component={TextField} fullWidth label='Title'/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field name='brand' component={TextField} label='Brand' fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field name='gender' select component={TextField} label='Gender' fullWidth>
                                <MenuItem value='men'>Men</MenuItem>
                                <MenuItem value='women'>Women</MenuItem>
                                <MenuItem value='child'>Child</MenuItem>
                                <MenuItem value='toddler'>Toddler</MenuItem>
                                <MenuItem value='preschool'>Preschool</MenuItem>
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <Field name='colorway' component={TextField} label='Color' fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field 
                                name='releaseDate' 
                                fullWidth 
                                component={TextField} type='date' 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field name='retailPrice' component={TextField} type='number' label='Price' fullWidth/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <UploadButton 
                                title="thumbnail"
                                setFieldValue={props.setFieldValue}
                                name='thumbUrl'
                                label={props.values.thumbUrl}
                                error={props.errors.thumbUrl}
                                accept=".png, .jpg, .jpeg, .svg"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <UploadButton 
                                title="small image"
                                setFieldValue={props.setFieldValue}
                                name='smallImageUrl'
                                label={props.values.smallImageUrl}
                                error={props.errors.smallImageUrl}
                                accept=".png, .jpg, .jpeg, .svg"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <UploadButton 
                                title="large image"
                                setFieldValue={props.setFieldValue}
                                name='imageUrl'
                                label={props.values.imageUrl}
                                error={props.errors.imageUrl}
                                accept=".png, .jpg, .jpeg, .svg"
                            />
                        </Grid>
                        <Grid item xs={8} mt={2} >
                            <LoadingButton variant="contained" fullWidth loading={loading} type='sumbit'>
                                Save
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={4} mt={2}>
                            <Button 
                                sx={{ whiteSpace:'nowrap' }}
                                onClick={()=> props.resetForm()}
                                variant="outlined"
                                color='warning'
                                fullWidth
                            >Reset form</Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
        <SnackbarAlert
            title='Item updated successfully'
            openAlert={openAlert}
            handleCloseAlert={handleCloseAlert}
            alertKey={data?.id}
            TransitionComponent={SlideTransition}
        />
        {error?.status === 422 ? <SnackbarAlert
            title={error?.data.message}
            openAlert={errorAlert}
            handleCloseAlert={handleCloseErrorAlert}
            alertKey={error?.data.message}
            TransitionComponent={SlideTransition}
            severity="error"
        /> : null   }
    </Paper>
  )
}

export default UpdateForm;