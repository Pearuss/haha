/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';

// import Link from 'next/link';
import { truncate } from '../../../utilities/helper';

function PostList({ post, handleCheckItemClick }: any) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div className="grid grid-cols-8 gap-1 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <span className="flex items-center">
        <Checkbox {...label} checked={post?.selected} onClick={() => handleCheckItemClick(post)} />
      </span>
      <span className="col-span-3 flex items-center w-[100%] py-1 ml-[-12%]">
        <div className="relative w-[220px] max-w-[120px] mr-2 h-[68px] ">
          <Image
            className="overflow-hidden rounded"
            loader={() => post.img}
            src={post.img}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="flex flex-col mt-[-5px] mb-auto">
          <h6 className="text-textAdmin text-base">{truncate(`${post.title}`, 55)}</h6>
          <span className="text-sm">{truncate(`${post.body}`, 20)}</span>
        </div>
      </span>
      <span>25/08/2000</span>
      <span>{post.author}</span>
      <span>
        <Image src="/images/check1.png" width={20} height={20} />
      </span>

      {/* <Link href={linkDetail}>
          <button className="flex-1 ml-6">
            <Image src="/images/edit.png" width={20} height={20} />
          </button>
        </Link> */}
      <span className="grid grid-cols-3 ml-[-40%]">
        <button className="flex items-center">
          <Image src="/images/target.png" width={20} height={20} />
          <span className="ml-[10%]">{post.inWorks}</span>
        </button>
        <button className="flex items-center 2xl:ml-[18%]">
          <Image src="/images/heart.png" width={20} height={20} />
          <span className="ml-[10%]">{post.likes}</span>
        </button>
        <button className="flex items-center 2xl:ml-[38%]">
          <Image src="/images/comment.png" width={20} height={20} />
          <span className="ml-[10%]">{post.comments}</span>
        </button>
      </span>
    </div>
  );
}

export default PostList;
