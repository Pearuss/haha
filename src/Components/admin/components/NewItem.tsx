/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';
import Link from 'next/link';

// import Link from 'next/link';
import { formatDate, truncate } from '../../../utilities/helper';

function NewItem({ _new, handleCheckItemClick }: any) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div className="grid grid-cols-7 gap-1 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <span className="flex items-center">
        <Checkbox {...label} checked={_new?.selected} onClick={() => handleCheckItemClick(_new)} />
      </span>
      <span className="col-span-3 flex items-center w-[100%] py-1 ml-[-12%]">
        {/* <div className="relative w-[220px] max-w-[120px] mr-2 h-[68px] ">
          <Image
            className="overflow-hidden rounded"
            loader={() => _new.img}
            src={_new.img}
            alt="New's image"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div> */}
        <div className="flex flex-col mt-[-2px] mb-auto">
          <h6 className="text-textAdmin text-base">{truncate(`${_new.title}`, 85)}</h6>
          <Link href={`/news/${_new.id}`}>
            <span className="text-sm cursor-pointer hover:opacity-40"># {_new.slug}</span>
          </Link>
        </div>
      </span>
      <span>{formatDate(new Date(_new?.createdAt))}</span>
      {/* <span>{_new.author}</span> */}
      <span>
        <Image src="/images/check1.png" alt="Check" width={20} height={20} />
      </span>

      {/* <Link href={linkDetail}>
          <button className="flex-1 ml-6">
            <Image src="/images/edit.png" width={20} height={20} />
          </button>
        </Link> */}
      <span className="grid grid-cols-3 ml-[-40%]">
        <button className="flex items-center">
          <Image src="/images/target.png" alt="Target" width={20} height={20} />
          <span className="ml-[10%]">{_new.inWorks}</span>
        </button>
        <button className="flex items-center 2xl:ml-[18%]">
          <Image src="/images/heart.png" alt="Heart" width={20} height={20} />
          <span className="ml-[10%]">{_new.likes}</span>
        </button>
        <button className="flex items-center 2xl:ml-[38%]">
          <Image src="/images/comment.png" alt="Comment" width={20} height={20} />
          <span className="ml-[10%]">{_new.comments}</span>
        </button>
      </span>
    </div>
  );
}

export default NewItem;
