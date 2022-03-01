/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '../../../utilities/helper';
import Popup from '../common/popUp';
import FormUpdateCategory from './FormUpdateCategory';

function CategoryItem({ cat }: any) {
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <div className="grid grid-cols-6 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <Link href={cat?.slug}>
        <span className="col-span-2 hover:opacity-50 cursor-pointer">{cat?.name}</span>
      </Link>
      <span>{cat?.parent_id === 0 ? 'Main' : 'Sub'}</span>
      <span>{formatDate(new Date(cat?.created_at))}</span>
      <Link href={cat?.slug}>
        <span className="ml-6 hover:opacity-50 cursor-pointer">{cat?.total}</span>
      </Link>

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
        <FormUpdateCategory category={cat} setOpenPopup={setOpenPopup} />
      </Popup>
    </div>
  );
}

export default CategoryItem;
