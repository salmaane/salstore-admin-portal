import { Button, Box, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { ErrorMessage } from "formik";

const UploadPictureButton = ({setFieldValue, name, label, accept='image/*', setPicture}) => {
    return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        <Button variant="outlined" color="success" component="label" startIcon={<CloudUploadOutlinedIcon/>} fullWidth>
            Choose Picture
            <input 
                name={name}
                hidden type="file"
                accept={accept}
                onChange={(e) => {
                    setFieldValue(name, e.target.files[0]);
                    setPicture(URL.createObjectURL(e.target.files[0]));
                }}
            />
        </Button>
        {label ? <Typography variant="body2" fontWeight='bold'>{label.name}</Typography> : null}
        <ErrorMessage name={name} >{(error) => <Typography variant="body2" color='red'>{error}</Typography>}</ErrorMessage>
    </Box>
    );
}

export default UploadPictureButton