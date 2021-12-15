import { Button, Checkbox, DialogActions, TextField } from '@mui/material';
import React from 'react';

export default function FormUpdateUser(props: any) {
  const { setOpenPopup, handleUpdateClick, user } = props;
  const label = { inputProps: { 'aria-label': 'Checkbox status user' } };
  return (
    <div className="flex flex-col items-center mx-auto px-8">
      <div className="flex items-center w-full mt-8">
        <span className="w-20 mr-4 flex font-medium text-gray-600 justify-start">Name*</span>
        <TextField defaultValue={user.name} size="small" id="outlined-basic" variant="outlined" />
      </div>
      <div className="flex items-center w-full mt-8">
        <span className="w-20 mr-4 flex font-medium text-gray-600 justify-start">Status*</span>
        <Checkbox {...label} defaultChecked={user.status} />
      </div>
      <DialogActions>
        <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
        <Button onClick={handleUpdateClick} autoFocus>
          Update
        </Button>
      </DialogActions>
    </div>
  );
}
