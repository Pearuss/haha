import React, { ReactElement } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';

interface Props {}

function ClientList({}: Props): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <div className="grid grid-cols-7 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <span className="flex items-center">
        <span className="flex-1">
          <Checkbox {...label} />
        </span>
        <span className="flex-1">1</span>
      </span>
      <span className="col-span-2">duc12a1cauxe0825@gmail.com</span>
      <span>Lê Huỳnh Đức</span>
      <span>0989275134</span>
      <span>25/08/200 08:25</span>
      <span className="flex items-center">
        <button className="mr-auto">Active</button>
        <button className="flex-1 ml-6">
          <Image src="/images/edit.png" width={20} height={20} />
        </button>
      </span>
    </div>
  );
}

export default ClientList;
