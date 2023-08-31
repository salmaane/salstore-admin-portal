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

function UpdateProfileDialog({isOpen, handleClose, state, picture, setPicture, setLoadedUser}) {
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
  const [deletedAlert, setDeletedAlert] = useState(false);
  const handleCloseDeletedAlert = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setDeletedAlert(false);
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
        handleResponse: (data) => {
            setOpenAlert(true);
            handleClose();
            setLoadedUser({...state, profile: data});
        },
    });

    actions.resetForm();
  }

  function handleDelete() {
    axiosFetch({
        url:'/delete-profile/' + state?.id,
        method:'delete',
        headers:{
            'Authorization' : token(),
        },
        handleResponse: (data) => {
            setDeletedAlert(true);
            handleClose();
            setLoadedUser({...state, profile: null});
            setPicture(null);
        },
    });
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
                                <Box sx={{ display:'flex', gap:1, alignItems:'flex-start' }}>
                                    <Button 
                                     variant='outlined'
                                     color='error'
                                     onClick={handleDelete}
                                    >Remove</Button>
                                    <UploadPictureButton
                                        name={'profile'}
                                        accept=".png, .jpg, .jpeg, .svg"
                                        label={props.values.profile}
                                        setFieldValue={props.setFieldValue}
                                        error={props.errors.profile}
                                        setPicture={setPicture}
                                    />
                                </Box>
                            </Box>
                            <DialogActions>
                                <Button color='error' 
                                    onClick={()=> {handleClose(); setPicture(state.profile)}}
                                    autoFocus 
                                >Cancel</Button>
                                <LoadingButton color='success' type='submit' loading={loading}>
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
        <SnackbarAlert
            title="Profile picture deleted"
            openAlert={deletedAlert}
            alertKey={state?.id}
            TransitionComponent={SlideTransition}
            handleCloseAlert={handleCloseDeletedAlert}
        />
    </>
  )
}

export default UpdateProfileDialog