/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import {
  Button, Checkbox, DialogActions, Typography,
} from '@mui/material';

export default function FormUpdateUser(props: any) {
  const { setOpenPopup, handleUpdateClick, user } = props;
  const label = { inputProps: { 'aria-label': 'Checkbox status user' } };

  const [status, setStatus] = useState(!!user.status);

  return (
    <div className="flex flex-col items-center mx-auto px-8">
      <div className="flex items-end w-full mt-8">
        <span className="w-20 mr-4 font-medium text-gray-600">Name*</span>
        <Typography className="font-medium text-gray-600 leading-none">
          {user.authorName ? user.authorName : `${user.firstName} ${user.lastName}`}
        </Typography>
      </div>
      <div className="flex items-end w-full mt-8">
        <span className="w-20 mr-4 font-medium text-gray-600">Email*</span>
        <Typography className="font-medium text-gray-600 leading-none">{user.email}</Typography>
      </div>
      <div className="flex items-center w-full mt-8">
        <span className="w-20 flex font-medium text-gray-600 justify-start">Status*</span>
        <Checkbox onChange={() => setStatus(!status)} {...label} checked={status} />
      </div>
      <DialogActions>
        <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
        <Button onClick={() => handleUpdateClick(user.id, status)} autoFocus>
          Update
        </Button>
      </DialogActions>
    </div>
  );
}
