/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import {
  Button,
  Checkbox,
  DialogActions,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

export default function FormUpdateUser(props: any) {
  const { setOpenPopup, handleUpdateClick, user } = props;
  const label = { inputProps: { 'aria-label': 'Checkbox status user' } };

  const [status, setStatus] = useState(!!user.status);
  const [role, setRole] = useState(user.role);

  return (
    <div className="flex flex-col items-center mx-auto px-8">
      <div className="flex items-end w-full mt-8">
        <span className="w-20 mr-4 font-medium text-gray-800">Name*</span>
        <Typography className="w-full font-medium text-gray-800 leading-none">
          {user.author ? user.author : `${user.first_name} ${user.last_name}`}
        </Typography>
      </div>
      <div className="flex items-end w-full mt-8">
        <span className="w-20 mr-4 font-medium text-gray-800">Email*</span>
        <Typography className="w-full font-medium text-gray-800 leading-none">{user.email}</Typography>
      </div>
      <div className="flex items-center w-full mt-9">
        <span className="w-20 mr-4 font-medium text-gray-800">Role*</span>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // label="Age"
            size='small'
            defaultValue={user.role}
            value={role}
            onChange={(e) => {
              setRole(+e.target.value);
            }}
          >
            <MenuItem value={0}>NONE</MenuItem>
            <MenuItem value={10}>USER</MenuItem>
            <MenuItem value={20}>MOD</MenuItem>
            <MenuItem value={30}>ADMIN</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex items-center w-full mt-8">
        <span className="w-20 flex font-medium text-gray-800 justify-start">Status*</span>
        <Checkbox onChange={() => setStatus(!status)} {...label} checked={status} />
      </div>
      <DialogActions>
        <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
        <Button onClick={() => handleUpdateClick(user.id, status, role)} autoFocus>
          Update
        </Button>
      </DialogActions>
    </div>
  );
}
