import React, { ReactElement } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';

function CustomerItem({ customer, handleCheckItemClick }: any): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <div className="grid grid-cols-7 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <span className="flex items-center">
        <span className="flex-1">
          <Checkbox
            {...label}
            checked={customer.selected}
            onClick={() => handleCheckItemClick(customer)}
          />
        </span>
        <span className="flex-1">{customer.id}</span>
      </span>
      <span className="col-span-2">{customer.email}</span>
      <span>{customer.name}</span>
      <span>{customer.phone}</span>
      <span>{customer.createAt}</span>
      <span className="flex items-center">
        <button className="mr-auto">{customer.status}</button>
        <button className="flex-1 ml-6">
          <Image src="/images/edit.png" width={20} height={20} />
        </button>
      </span>
    </div>
  );
}

export default CustomerItem;
