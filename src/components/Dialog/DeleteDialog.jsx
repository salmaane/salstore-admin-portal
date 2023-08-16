import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SnackbarAlert from '../SnackbarAlert/SnackbarAlert';
import SlideTransition from './SlideTransition';
import { useState } from 'react';

function DeleteDialog({isOpen, handleClose, onConfirm, state}) {
  const [openAlert, setOpenAlert] = useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenAlert(false);
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
        Are you sure to delete this item ?
      </DialogTitle>
      <DialogContent>
          <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', gap:2, my:3}}>
            <img alt='product' src={state?.media.thumbUrl} style={{ width:'auto', height:'auto', maxWidth:'90px' }}/>
            <Typography variant='h5'>{state?.title}</Typography>
          </Box>
      </DialogContent>
      <DialogActions>
        <Button color='error' onClick={handleClose} autoFocus >Cancel</Button>
        <Button color='error' onClick={()=> {handleClose(); onConfirm(state.id); setOpenAlert(true)}} >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
    <SnackbarAlert
      title="Item deleted successfully"
      openAlert={openAlert}
      alertKey={state?.id}
      TransitionComponent={SlideTransition}
      handleCloseAlert={handleCloseAlert}
    />
  </>
  )
}

export default DeleteDialog