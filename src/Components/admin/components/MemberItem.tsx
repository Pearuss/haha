/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { IconButton, Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '../../../utilities/helper';

function MemberItem(props: any) {
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
      <Link href={`/user/${member?.id}`}>
        <span className="ml-[-42%] hover:opacity-50">{member?.email}</span>
      </Link>
      <Link href={`/user/${member?.id}`}>
        <span className="hover:opacity-50">
          {member?.author ? member.author : `${member?.first_name} ${member?.last_name}`}
        </span>
      </Link>

      {/* <span>{member.authorization}</span> */}
      <span>All category</span>
      <span>{formatDate(new Date(member?.created_at))}</span>
      <span className="flex items-center gap-[45%]">
        <span>
          <Image
            loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/check1.png`}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/check1.png`}
            alt="Check"
            width={20}
            height={20}
          />
        </span>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setOpenPopup(true);
              setAdminSelected(member);
            }}
          >
            <Image
              loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/edit.png`}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/edit.png`}
              alt="Edit"
              width={20}
              height={20}
            />
          </IconButton>
        </Tooltip>
      </span>
    </div>
  );
}

export default MemberItem;
