import React, { ReactElement } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';

function MemberItem({ member, handleCheckItemClick }: any): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <div className="grid grid-cols-6 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <span className="flex items-center">
        <span className="flex-1">
          <Checkbox
            {...label}
            checked={member.selected}
            onClick={() => handleCheckItemClick(member)}
          />
        </span>
      </span>
      <span className="ml-[-42%]">{member.email}</span>
      <span>{member.name}</span>
      {/* <span>{member.authorization}</span> */}
      <span>All category</span>
      <span>{member.createAt}</span>
      <span className="flex items-center">
        <span>
          <Image src="/images/check1.png" width={20} height={20} />
        </span>
        <button className="flex-1 ml-6">
          <Image src="/images/edit.png" width={20} height={20} />
        </button>
      </span>
    </div>
  );
}

export default MemberItem;
