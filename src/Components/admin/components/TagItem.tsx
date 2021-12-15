/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';

import { IconButton, Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';

function TagList(props: any): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const {
    tag, handleCheckItemClick, setOpenPopup, setTagSelected,
  } = props;

  return (
    <div className="grid grid-cols-5 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <span className="flex items-center">
        <span className="flex-1">
          <Checkbox {...label} checked={tag.selected} onClick={() => handleCheckItemClick(tag)} />
        </span>
      </span>
      <span>{tag.name}</span>
      <span>{tag.createAt}</span>
      <span>2000</span>
      <span className="flex items-center gap-[45%]">
        <span>
          <Image src="/images/check1.png" width={20} height={20} />
        </span>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setOpenPopup(true);
              setTagSelected(tag);
            }}
          >
            <Image src="/images/edit.png" width={20} height={20} />
          </IconButton>
        </Tooltip>
      </span>
    </div>
  );
}

export default TagList;
