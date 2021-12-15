import React from 'react';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';

export default function Popup(props: any) {
  const { title, children, openPopup } = props;

  return (
    <Dialog open={openPopup} maxWidth="md">
      <DialogTitle>
        <div>{title}</div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
