/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import {
  Button,
  Checkbox,
  DialogActions,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, catName: string[], theme: Theme) {
  return {
    fontWeight:
      catName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const category = [
  'Minnas Cover',
  'Paine Hunter',
  'Teachnical',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function FormUpdateAdmin(props: any) {
  const { setOpenPopup, handleUpdateClick, admin } = props;
  const label = { inputProps: { 'aria-label': 'Checkbox status user' } };

  const theme = useTheme();
  const [catName, setCatName] = React.useState<string[]>(category);
  const [role, setRole] = useState(admin.role);
  const [status, setStatus] = useState(!!admin.status);

  const handleChange = (event: SelectChangeEvent<typeof catName>) => {
    const {
      target: { value },
    } = event;
    setCatName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <div className="flex flex-col items-center mx-auto px-8">
      <div className="flex items-end w-full mt-8">
        <span className="w-20 mr-4 font-medium text-gray-800">Name*</span>
        <Typography className="w-full font-medium text-gray-800 leading-none">
          {admin.author ? admin.author : `${admin.first_name} ${admin.last_name}`}
        </Typography>
      </div>
      <div className="flex items-end w-full mt-8">
        <span className="w-20 mr-4 font-medium text-gray-800">Email*</span>
        <Typography className="w-full font-medium text-gray-800 leading-none">{admin.email}</Typography>
      </div>
      <div className="flex items-center w-full mt-8">
        <span className="w-20 mr-4 font-medium text-gray-800">Role*</span>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size='small'
            defaultValue={admin.role}
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
        <span className="w-20 mr-4 flex font-medium text-gray-800 justify-start">Mode*</span>
        <FormControl sx={{  width: 300 }}>
          <Select
            id="demo-multiple-name"
            size="small"
            className='ml-[-1rem]'
            multiple
            value={catName}
            onChange={handleChange}
            MenuProps={MenuProps}
          >
            {category.map((cat) => (
              <MenuItem key={cat} value={cat} style={getStyles(cat, catName, theme)}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="flex items-center w-full mt-8">
        <span className="w-20 flex font-medium text-gray-800 justify-start">Status*</span>
        <Checkbox onChange={() => setStatus(!status)} {...label} checked={status} />
      </div>
      <DialogActions>
        <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
        <Button onClick={() => handleUpdateClick(admin.id, status, role)} autoFocus>
          Update
        </Button>
      </DialogActions>
    </div>
  );
}
