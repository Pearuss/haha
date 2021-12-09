import React, { ReactElement } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';

function CategoryItem({ cat, handleCheckItemClick }: any): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <div className="grid grid-cols-6 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <span className="flex items-center">
        <span className="flex-1">
          <Checkbox {...label} checked={cat.selected} onClick={() => handleCheckItemClick(cat)} />
        </span>
        <span className="flex-1">{cat.id}</span>
      </span>
      <span>{cat.name}</span>
      <span>{cat.createAt}</span>
      <span className="col-span-2">{cat.description}</span>
      <span className="flex items-center">
        <button className="mr-auto">{cat.status}</button>
        <button className="flex-1 ml-6">
          <Image src="/images/eye.png" width={20} height={20} />
        </button>
      </span>
    </div>
  );
}

export default CategoryItem;
