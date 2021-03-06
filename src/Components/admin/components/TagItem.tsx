/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';

import { formatDate } from '../../../utilities/helper';
import Popup from '../common/popUp';
import FormUpdateTag from './FormUpdateTag';

function TagList({ tag, setCallMutateAgain }: any) {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="grid grid-cols-4 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <a
        href={`/tag${tag?.slug}`}
        target="_blank"
        rel="tag link noreferrer"
        className="hover:opacity-50 no-underline text-textAdmin"
      >
        {tag?.name}
      </a>

      <span>{formatDate(new Date(tag?.created_at))}</span>

      <a
        href={`/tag${tag?.slug}`}
        target="_blank"
        rel="tag link noreferrer"
        className="ml-6 hover:opacity-50 no-underline text-textAdmin"
      >
        {tag?.total}
      </a>

      <span className="flex items-center gap-[45%]">
        <span>
          <Image
            loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/check1.png`}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/check1.png`}
            alt="Check Icon"
            width={20}
            height={20}
          />
        </span>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setOpenPopup(true);
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
      <Popup title="Update Tag" open={openPopup}>
        <FormUpdateTag
          tag={tag}
          setOpenPopup={setOpenPopup}
          setCallMutateAgain={setCallMutateAgain}
        />
      </Popup>
    </div>
  );
}

export default TagList;
