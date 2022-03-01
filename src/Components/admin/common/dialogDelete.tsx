import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

function DialogDelete({ label, subContnet, openDialog, setOpenDialog }: any) {
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleDeleteClick = () => {
    setOpenDialog(false);
  };
  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{label}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{subContnet}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDeleteClick} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogDelete;
