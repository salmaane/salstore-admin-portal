import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function DeleteDialog({isOpen, handleClose, onAgree, state}) {
  return (
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
            <Box sx={{ display:'flex', alignItems:'center', flexDirection:'column', gap:2, my:3}}>
              <img alt='product' src={state?.media.thumbUrl} style={{ width:'auto', height:'auto', maxWidth:'90px' }}/>
              <Typography variant='h5'>{state?.title}</Typography>
            </Box>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose} autoFocus >Disagree</Button>
          <Button color='error' onClick={()=> {handleClose(); onAgree(state.id)}} >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DeleteDialog