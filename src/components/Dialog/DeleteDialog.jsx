import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SnackbarAlert from '../SnackbarAlert/SnackbarAlert';
import SlideTransition from './SlideTransition';
import { useState } from 'react';

function DeleteDialog({ title, bodyContent, isOpen, handleClose, onConfirm, id}) {
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
        {title}
      </DialogTitle>
      <DialogContent>
        {bodyContent}
      </DialogContent>
      <DialogActions>
        <Button color='error' onClick={handleClose} autoFocus >Cancel</Button>
        <Button color='error' onClick={()=> {handleClose(); onConfirm(id); setOpenAlert(true)}} >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
    <SnackbarAlert
      title="Item deleted successfully"
      openAlert={openAlert}
      alertKey={id}
      TransitionComponent={SlideTransition}
      handleCloseAlert={handleCloseAlert}
    />
  </>
  )
}

export default DeleteDialog