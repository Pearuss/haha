/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';
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
          <a
            href={`/news/${_new.id}`}
            target="_blank"
            rel="new link noreferrer"
            className="text-sm cursor-pointer hover:opacity-50 no-underline text-textAdmin"
          >
            #
            {_new.slug}
          </a>
        </div>
      </span>
      <span>{formatDate(new Date(_new?.createdAt))}</span>
      <span className="flex items-center gap-[45%]">
        {_new.status !== '0' ? (
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
