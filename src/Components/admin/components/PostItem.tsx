/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';
import Link from 'next/link';

// import Link from 'next/link';
import { formatDate, truncate } from '../../../utilities/helper';

function PostList({ post, handleCheckItemClick }: any) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [imgArticle, setImgArticle] = useState(
    `${process.env.NEXT_PUBLIC_IMAGE_URL}${post.thumbnail}`,
  );

  return (
    <div className="grid grid-cols-8 gap-1 bg-white hover:bg- px-3 py-1 font-medium items-center">
      <span className="flex items-center">
        <Checkbox {...label} checked={post?.selected} onClick={() => handleCheckItemClick(post)} />
      </span>
      <span className="col-span-3 flex items-center w-[100%] py-1 ml-[-12%]">
        <div className="relative w-[220px] max-w-[120px] mr-2 h-[68px] ">
          <Image
            className="overflow-hidden rounded"
            loader={() => imgArticle}
            src={imgArticle}
            onError={() => {
              setImgArticle(
                `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/cover-photo4.jpg`,
              );
            }}
            alt="Article's image"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="flex flex-col mt-[-5px] mb-auto">
          <h6 className="text-textAdmin text-base">{truncate(`${post.title}`, 55)}</h6>
          <Link href={`/posts/${post?.slug}`}>
            <span className="text-sm cursor-pointer hover:opacity-50">
              #
              {truncate(`${post?.slug}`, 55)}
            </span>
          </Link>
        </div>
      </span>
      <span>{formatDate(new Date(post?.published_at))}</span>
      <span>
        {post?.authorName ? post.authorName : `${post?.authorFirstname} ${post?.authorLastname}`}
      </span>
      <span>
        <Image
          loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/check1.png`}
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/check1.png`}
          alt="Check"
          width={20}
          height={20}
        />
      </span>

      {/* <Link href={linkDetail}>
          <button className="flex-1 ml-6">
            <Image src="/images/edit.png" width={20} height={20} />
          </button>
        </Link> */}
      <span className="grid grid-cols-3 ml-[-40%]">
        <button className="flex items-center">
          <Image
            loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/target.png`}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/target.png`}
            alt="Target"
            width={20}
            height={20}
          />
          <span className="ml-[10%]">{post.countInwork}</span>
        </button>
        <button className="flex items-center 2xl:ml-[18%]">
          <Image
            loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/heart.png`}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/heart.png`}
            alt="Like"
            width={20}
            height={20}
          />
          <span className="ml-[10%]">{post.countLike}</span>
        </button>
        <button className="flex items-center 2xl:ml-[38%]">
          <Image
            loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/comment.png`}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/comment.png`}
            alt="Comment"
            width={20}
            height={20}
          />
          <span className="ml-[10%]">{post.countComment}</span>
        </button>
      </span>
    </div>
  );
}

export default PostList;
