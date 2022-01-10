/* eslint-disable object-curly-newline */
/* eslint-disable react/button-has-type */
import React from 'react';

import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import LayoutAdminPage from '../../../Components/admin/layout';

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

function CreateCategory() {
  const [catName, setCatName] = React.useState<string[]>(category);

  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof catName>) => {
    const {
      target: { value },
    } = event;
    setCatName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <LayoutAdminPage title="Home">
      <HeaderAdmin
        titlePage="Create a Administrator"
        subTitlePage=""
        searchPlaceholder="Administrator..."
      />
      <div className="py-4 w-full">
        <h5 className="pb-4 mb-4 border-b-2 border-gray-600">Administrator information</h5>
        <div className="flex flex-col items-center w-[50vw] mx-auto">
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end">UserName*</span>
            <input className="w-full py-3 px-4 outline-none rounded ml-8" type="text" />
          </div>
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end">Email*</span>
            <input className="w-full py-3 px-4 outline-none rounded ml-8" type="text" />
          </div>
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end">Mode*</span>
            <FormControl className="w-full outline-none rounded ml-8" sx={{ m: 1, width: 300 }}>
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
          <button
            // onClick={updatePostHandler}
            className="ml-auto py-2 px-6 rounded bg-white text-gray-600 font-medium tracking-wide  mt-8"
          >
            Confirm
          </button>
        </div>
      </div>
    </LayoutAdminPage>
  );
}

export default CreateCategory;
