/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  Button, Checkbox, DialogActions, TextField,
} from '@mui/material';

export default function FormUpdateTag(props: any) {
  const { setOpenPopup, tag } = props;
  const label = { inputProps: { 'aria-label': 'Checkbox status user' } };
  return (
    <div className="flex flex-col items-center mx-auto px-8">
      <div className="flex items-center w-full mt-8">
        <span className="w-20 mr-4 flex font-medium text-gray-600 justify-start">Name*</span>
        <TextField defaultValue={tag.name} size="small" id="outlined-basic" variant="outlined" />
      </div>
      <div className="flex items-center w-full mt-8">
        <span className="w-20 mr-4 flex font-medium text-gray-600 justify-start">Status*</span>
        <Checkbox {...label} defaultChecked={tag.status} />
      </div>
      <DialogActions>
        <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
        <Button autoFocus>Update</Button>
      </DialogActions>
    </div>
  );
}
