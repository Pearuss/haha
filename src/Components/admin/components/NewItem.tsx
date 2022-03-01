/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { formatDate, truncate } from '../../../utilities/helper';

function NewItem({ _new }: any) {
  const router = useRouter();
  const goToEditPage = (id: number) => {
    router.push(`/adminpanel/news/${id}`);
  };

  return (
    <div className="grid grid-cols-6 gap-1 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <span className="col-span-4 flex items-center w-[100%] py-1">
        <div className="flex flex-col mt-[-2px] mb-auto">
          <h6 className="text-textAdmin text-base">{truncate(`${_new.title}`, 85)}</h6>
          <Link href={`/news/${_new.id}`}>
            <span className="text-sm cursor-pointer hover:opacity-40">#{_new.slug}</span>
          </Link>
        </div>
      </span>
      <span>{formatDate(new Date(_new?.createdAt))}</span>
      <span className="flex items-center gap-[45%]">
        <Image
          loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/check1.png`}
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/check1.png`}
          alt="Check"
          width={20}
          height={20}
        />
        <span>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                goToEditPage(_new.id);
              }}
            >
              <Image
                loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/edit.png`}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/edit.png`}
                alt="edit"
                width={20}
                height={20}
              />
            </IconButton>
          </Tooltip>
        </span>
      </span>
    </div>
  );
}

export default NewItem;
