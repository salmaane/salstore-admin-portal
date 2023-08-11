import { Grid, Paper, MenuItem, Button } from "@mui/material"
import { LoadingButton } from "@mui/lab";
// Formik
import { Formik, Form, Field } from "formik"
import { TextField } from "formik-mui"
import * as yup from 'yup';
// Axios
import useAxiosFunction from "../../hooks/useAxiosFunction";
import AxiosInstance from "axios";

function AddSneakerForm() {
    
    const FORM_VALIDATION = yup.object().shape({
        title: yup.string().required('Title is a required field'),
        gender: yup.string().required('Gender is a required field'),
        colorWay: yup.string().required('Color is a required field'),
        brand: yup.string().required('Brand is a required field'),
        retailPrice: yup.number().required('Price is a required field'),
        releaseDate: yup.date().required('Date is a required field')
    });

    function handleSubmit(values, actions) {
        console.log(values);

        actions.resetForm();
    };

  return (
    <Paper elevation={0} sx={{ p:2 }}>
        <Formik
            initialValues={{ 
                title: '',
                brand: '',
                gender:'men',
                colorWay: '',
                releaseDate: '',
                retailPrice: '',
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
                            </Field>
                        </Grid>
                        <Grid item xs={12}>
                            <Field name='colorWay' component={TextField} label='Color' fullWidth/>
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
                        <Grid item xs={8} mt={2} >
                            <LoadingButton variant="contained" fullWidth loading={false} type='sumbit'>
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
    </Paper>
  )
}

export default AddSneakerForm