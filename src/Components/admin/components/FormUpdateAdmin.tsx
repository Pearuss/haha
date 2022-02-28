/* eslint-disable max-len */
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
import useSWR from 'swr';

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

function getStyles(theme: Theme) {
  return {
    fontWeight: theme.typography.fontWeightMedium,
  };
}

export default function FormUpdateAdmin(props: any) {
  const { setOpenPopup, handleUpdateClick, admin } = props;
  const label = { inputProps: { 'aria-label': 'Checkbox status user' } };

  const theme = useTheme();

  const arrIds = admin.modIds?.split(',').map((id: string) => +id);

  const { data: cata }: any = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/category/menu`, {
    revalidateOnFocus: false,
  });
  const categories = cata?.data.map((item: any) => ({ id: item.id, name: item.name }));

  const [mods, setMods] = React.useState(arrIds || []);
  const [role, setRole] = useState(admin.role);
  const [status, setStatus] = useState(!!admin.status);

  const handleChange = (event: SelectChangeEvent<typeof mods>) => {
    const {
      target: { value },
    } = event;
    setMods(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <div className="flex flex-col items-center mx-auto px-8">
      <div className="flex items-end w-full mt-8">
        <span className="w-20 mr-4 font-medium text-gray-600">Name*</span>
        <Typography className="font-medium text-gray-600 leading-none">
          {admin.authorName ? admin.authorName : `${admin.firstName} ${admin.lastName}`}
        </Typography>
      </div>
      <div className="flex items-end w-full mt-8">
        <span className="w-20 mr-4 font-medium text-gray-600">Email*</span>
        <Typography className="font-medium text-gray-600 leading-none">{admin.email}</Typography>
      </div>
      <div className="flex items-end w-full mt-8">
        <span className="w-20 mr-4 font-medium text-gray-600">Role*</span>
        <FormControl variant="filled" fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
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
            <MenuItem value={40}>SUPER ADMIN</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex items-center w-full mt-8">
        <span className="w-20 mr-4 flex font-medium text-gray-600 justify-start">Mode*</span>
        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            id="demo-multiple-name"
            size="small"
            multiple
            value={mods}
            onChange={handleChange}
            MenuProps={MenuProps}
          >
            {categories?.map((category: any) => (
              <MenuItem key={category.id} value={category.id} style={getStyles(theme)}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="flex items-center w-full mt-8">
        <span className="w-20 flex font-medium text-gray-600 justify-start">Status*</span>
        <Checkbox onChange={() => setStatus(!status)} {...label} checked={status} />
      </div>
      <DialogActions>
        <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
        <Button onClick={() => handleUpdateClick(admin.id, status, role, mods)} autoFocus>
          Update
        </Button>
      </DialogActions>
    </div>
  );
}
