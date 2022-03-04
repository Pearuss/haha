/* eslint-disable no-nested-ternary */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '../../../utilities/helper';

function MemberItem(props: any) {
  const { member, setOpenPopup, setAdminSelected } = props;

  return (
    <div className="grid grid-cols-6 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <Link href={`/user/${member?.id}`}>
        <span className="col-span-2 hover:opacity-50">{member?.email}</span>
      </Link>
      <Link href={`/user/${member?.id}`}>
        <span className="hover:opacity-50">
          {member?.authorName ? member.authorName : `${member?.firstName} ${member?.lastName}`}
        </span>
      </Link>

      <span
        className="inline-block w-36 whitespace-nowrap overflow-hidden overflow-ellipsis"
        title={member.modNames}
      >
        {member.role === 40 ? 'All categories' : member.modNames ? `${member.modNames}` : 'No'}
      </span>
      <span>{formatDate(new Date(member?.createdAt))}</span>
      <span className="flex items-center gap-[45%]">
        <span>
        {member.status !== 0 ? (
          <Tooltip title="Status">
            <IconButton>
              <Image
                loader={() =>
                  `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/check1.png`
                }
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/check1.png`}
                alt="check"
                width={20}
                height={20}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Status">
            <IconButton>
              <Image
                loader={() =>
                  `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/cross.png`
                }
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/cross.png`}
                alt="cross"
                width={20}
                height={20}
              />
            </IconButton>
          </Tooltip>
        )}
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
