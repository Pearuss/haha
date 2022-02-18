/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { IconButton, Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '../../../utilities/helper';

function TagList(props: any) {
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
      <Link href={`/tag${tag?.slug}`}>
        <span className="ml-[-50%] hover:opacity-50 cursor-pointer">{tag?.name}</span>
      </Link>

      <span>{formatDate(new Date(tag?.created_at))}</span>
      <Link href={`/tag${tag?.slug}`}>
        <span className="ml-6 hover:opacity-50 cursor-pointer">{tag?.total}</span>
      </Link>

      <span className="flex items-center gap-[45%]">
        <span>
          <Image src="/images/check1.png" alt="Check" width={20} height={20} />
        </span>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setOpenPopup(true);
              setTagSelected(tag);
            }}
          >
            <Image src="/images/edit.png" alt="Edit" width={20} height={20} />
          </IconButton>
        </Tooltip>
      </span>
    </div>
  );
}

export default TagList;
