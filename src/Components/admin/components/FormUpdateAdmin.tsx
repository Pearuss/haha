import React from 'react';

import {
  Button,
  DialogActions,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
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

  const theme = useTheme();
  const [catName, setCatName] = React.useState<string[]>(category);

  const handleChange = (event: SelectChangeEvent<typeof catName>) => {
    const {
      target: { value },
    } = event;
    setCatName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  return (
    <div className="flex flex-col items-center mx-auto px-8">
      <div className="flex items-center w-full mt-8">
        <span className="w-20 mr-4 flex font-medium text-gray-600 justify-start">Name*</span>
        <TextField defaultValue={admin.name} size="small" id="outlined-basic" variant="outlined" />
      </div>
      <div className="flex items-center w-full mt-8">
        <span className="w-20 mr-4 flex font-medium text-gray-600 justify-start">Mode*</span>
        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            id="demo-multiple-name"
            size="small"
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
      <DialogActions>
        <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
        <Button onClick={handleUpdateClick} autoFocus>
          Update
        </Button>
      </DialogActions>
    </div>
  );
}
