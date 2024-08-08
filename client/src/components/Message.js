import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const Message = ({ message, variant }) => {
  
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    }

    return (
    <>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical:"bottom", horizontal:"right" }} >
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={variant} sx={{ width: '100%' }}>
              {message}
            </MuiAlert>
        </Snackbar>
    </>
  )
}

