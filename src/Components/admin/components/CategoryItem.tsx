/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { IconButton, Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';

function CategoryItem(props: any) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const {
    cat, handleCheckItemClick, setOpenPopup, setCategorySelected,
  } = props;

  return (
    <div className="grid grid-cols-5 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <span className="flex items-center">
        <span className="flex-1">
          <Checkbox {...label} checked={cat.selected} onClick={() => handleCheckItemClick(cat)} />
        </span>
      </span>
      <span>{cat.name}</span>
      <span>{cat.createAt}</span>
      <span>3000</span>
      <span className="flex items-center gap-[45%]">
        <span>
          <Image src="/images/check1.png" width={20} height={20} />
        </span>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setOpenPopup(true);
              setCategorySelected(cat);
            }}
          >
            <Image src="/images/edit.png" width={20} height={20} />
          </IconButton>
        </Tooltip>
      </span>
    </div>
  );
}

export default CategoryItem;
