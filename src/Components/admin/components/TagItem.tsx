import React, { ReactElement } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';

function TagList({ tag, handleCheckItemClick }: any): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <div className="grid grid-cols-4 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <span className="flex items-center">
        <span className="flex-1">
          <Checkbox {...label} checked={tag.selected} onClick={() => handleCheckItemClick(tag)} />
        </span>
      </span>
      <span>{tag.name}</span>
      <span>{tag.createAt}</span>
      <span className="flex items-center gap-[32%]">
        <span>
          <Image src="/images/check1.png" width={20} height={20} />
        </span>
        <span>
          <Image src="/images/eye.png" width={20} height={20} />
        </span>
        <span>
          <Image src="/images/edit.png" width={20} height={20} />
        </span>
      </span>
    </div>
  );
}

export default TagList;
