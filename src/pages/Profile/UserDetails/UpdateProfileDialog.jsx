import { useState } from 'react';
import { Button, Dialog, Avatar, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// components
import SnackbarAlert from '../../../components/SnackbarAlert/SnackbarAlert';
import SlideTransition from '../../../components/Dialog/SlideTransition';
import UploadPictureButton from './UploadPictureButton';
// Formik
import { Formik, Form } from 'formik';
import * as yup from 'yup';
// Axios
import useAxiosFunction from '../../../hooks/useAxiosFunction';
import usersInstance from '../../../services/users';
import { useAuthHeader } from 'react-auth-kit';

function UpdateProfileDialog({isOpen, handleClose, state, picture, setPicture}) {
  const token = useAuthHeader();
  const {data, error, loading, axiosFetch} = useAxiosFunction(usersInstance);
  const formData = new FormData();
  const [openAlert, setOpenAlert] = useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenAlert(false);
  }

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const FORM_VALIDATION = yup.object().shape({
    profile: yup.mixed().required('choose a picture first')
        .test("is-valid-size", "Max allowed size is 5Mb", value => value===undefined ? true : (value && value.size) <= MAX_IMAGE_SIZE ),
  });

  function handleSubmit(values, actions) {
    formData.append('profile',values.profile);

    axiosFetch({
        url:'/update-profile/' + state?.id + '?_method=patch',
        method:'post',
        headers:{
            'Authorization' : token(),
            'Content-Type': 'multipart/form-data',
        },
        data: formData,
        handleResponse: (data) => console.log(data),
    });

    actions.resetForm();
  }

  return (
      <>
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" variant='h4'>
                Update profile picture
            </DialogTitle>
            <DialogContent>
                <Formik
                    enableReinitialize
                    initialValues={{ 
                        profile: '',
                        }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={handleSubmit}
                >
                    {(props) => (
                        <Form autoComplete='off' style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'2rem',margin:'2vh 7vw 0 7vw'}}>
                            <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',gap:2}} >
                                <Avatar 
                                    src={picture}
                                    sx={{ width: 150, height:150, cursor:'pointer', border:'1px solid green' }}
                                />
                                <UploadPictureButton
                                    name={'profile'}
                                    accept=".png, .jpg, .jpeg, .svg"
                                    label={props.values.profile}
                                    setFieldValue={props.setFieldValue}
                                    error={props.errors.profile}
                                    setPicture={setPicture}
                                />
                            </Box>
                            <DialogActions sx={{ alignSelf:'flex-end', justifySelf:'flex-end' }}>
                                <Button color='error' 
                                    onClick={()=> {handleClose(); setPicture(state.profile)}}
                                    autoFocus 
                                >Cancel</Button>
                                <LoadingButton color='success' type='submit' loading={loading}
                                    // onClick={()=> {
                                    //     handleClose();
                                    //     setOpenAlert(true);
                                    // }} 
                                >
                                    Save Changes
                                </LoadingButton>
                             </DialogActions>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
        <SnackbarAlert
            title="Profile picture updated"
            openAlert={openAlert}
            alertKey={state?.id}
            TransitionComponent={SlideTransition}
            handleCloseAlert={handleCloseAlert}
        />
    </>
  )
}

export default UpdateProfileDialog