import React, { ReactElement } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';

function TagList({ tag, handleCheckItemClick }: any): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <div className="grid grid-cols-6 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <span className="flex items-center">
        <span className="flex-1">
          <Checkbox {...label} checked={tag.selected} onClick={() => handleCheckItemClick(tag)} />
        </span>
        <span className="flex-1">{tag.id}</span>
      </span>
      <span>{tag.name}</span>
      <span>{tag.createAt}</span>
      <span className="col-span-2">{tag.description}</span>
      <span className="flex items-center">
        <button className="mr-auto">{tag.status}</button>
        <button className="flex-1 ml-6">
          <Image src="/images/edit.png" width={20} height={20} />
        </button>
      </span>
    </div>
  );
}

export default TagList;
