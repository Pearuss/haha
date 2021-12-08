import React, { ReactElement } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';
import Link from 'next/link';
import { truncate } from '../../../utilities/helper';

function PostList({ data }: any): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const linkDetail = `/admin/posts/${data.id}`;

  return (
    <div className="grid grid-cols-8 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <span className="flex items-center">
        <span className="flex-1">
          <Checkbox {...label} />
        </span>
        <span className="flex-1">{data.id}</span>
      </span>
      <span className="col-span-4 flex items-center w-[90%] py-1">
        <div className="relative w-[220px] max-w-[120px] mr-2 h-[68px] ">
          <Image
            className="overflow-hidden rounded"
            loader={() => data.img}
            src={data.img}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="flex flex-col mt-[-5px] mb-auto">
          <h6 className="text-textAdmin text-base">{data.title}</h6>
          <span className="text-sm">{truncate(`${data.body}`, 100)}</span>
        </div>
      </span>
      <span>{data.author}</span>
      <span>25/08/200 08:25</span>
      <span className="flex items-center">
        <button className="mr-auto">Active</button>
        <Link href={linkDetail}>
          <button className="flex-1 ml-6">
            <Image src="/images/edit.png" width={20} height={20} />
          </button>
        </Link>
      </span>
    </div>
  );
}

export default PostList;
