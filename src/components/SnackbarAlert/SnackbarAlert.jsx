import React from 'react'
import { Snackbar, Alert } from '@mui/material';

function SnackbarAlert({
    title, 
    openAlert, 
    alertKey, 
    handleCloseAlert, 
    anchorOrigin, 
    TransitionComponent, 
    autoHideDuration=5000, 
    severity='success' 
}) {
    anchorOrigin = anchorOrigin || { vertical: 'bottom', horizontal: 'left' };

  return (
    <Snackbar 
            open={openAlert} autoHideDuration={autoHideDuration}
            onClose={handleCloseAlert} key={alertKey}
            anchorOrigin={anchorOrigin}
            TransitionComponent={TransitionComponent}
    >
        <Alert onClose={handleCloseAlert} severity={severity} sx={{ width: '100%' }}>
            {title}
        </Alert>
    </Snackbar>
  )
}

export default SnackbarAlert