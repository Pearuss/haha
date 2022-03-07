/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';

import { formatDate } from '../../../utilities/helper';
import Popup from '../common/popUp';
import FormUpdateCategory from './FormUpdateCategory';

function CategoryItem({ cat, setCallGetCateAgain }: any) {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="grid grid-cols-6 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <a
        href={cat?.slug}
        target="_blank"
        rel="profile link noreferrer"
        className="col-span-2 hover:opacity-50 no-underline text-textAdmin"
      >
        {cat?.name}
      </a>

      <span>{cat?.parent_id === 0 ? 'Main' : 'Sub'}</span>
      <span>{formatDate(new Date(cat?.created_at))}</span>

      <a
        href={cat?.slug}
        target="_blank"
        rel="profile link noreferrer"
        className="ml-6 hover:opacity-50 no-underline text-textAdmin"
      >
        {cat?.total}
      </a>

      <span className="flex items-center gap-[45%]">
        <span>
          {cat.status !== 0 ? (
            <Tooltip title="Status">
              <IconButton>
                <Image
                  loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/check1.png`}
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
                  loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/cross.png`}
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
      <Popup title="Update Category" open={openPopup} setOpen={setOpenPopup}>
        <FormUpdateCategory
          category={cat}
          setOpenPopup={setOpenPopup}
          setCallGetCateAgain={setCallGetCateAgain}
        />
      </Popup>
    </div>
  );
}

export default CategoryItem;
