import { Button, Box, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { ErrorMessage } from "formik";

const UploadButton = ({title, setFieldValue, name, label, error}) => {
    return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        <Button variant="outlined" color="success" component="label" startIcon={<CloudUploadOutlinedIcon/>} fullWidth>
            Choose {title}
            <input 
                name={name}
                hidden type="file"
                accept='image/*'
                onChange={(e) => {
                    setFieldValue(name, e.target.files[0]);
                }}
            />
        </Button>
        {label ? <Typography variant="body2" fontWeight='bold'>{label.name}</Typography> : null}
        <ErrorMessage name={name} >{(error) => <Typography variant="body2" color='red'>{error}</Typography>}</ErrorMessage>
    </Box>
    );
}

export default UploadButton