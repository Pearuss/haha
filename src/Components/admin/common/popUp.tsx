import React from 'react';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';

export default function Popup(props: any) {
  const { title, children, open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle>
        <div>{title}</div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
