import React, { ReactElement } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';
import { IconButton, Tooltip } from '@mui/material';

function MemberItem(props: any): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const { member, handleCheckItemClick, setOpenPopup, setAdminSelected } = props;

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
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setOpenPopup(true);
              setAdminSelected(member);
            }}
          >
            <Image src="/images/edit.png" width={20} height={20} />
          </IconButton>
        </Tooltip>
      </span>
    </div>
  );
}

export default MemberItem;
