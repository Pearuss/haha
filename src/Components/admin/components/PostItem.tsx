/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import Switch from '@material-ui/core/Switch';
import { Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

// import Link from 'next/link';
import { formatDate, truncate } from '../../../utilities/helper';

function PostList({ post }: any) {
  const [imgArticle, setImgArticle] = useState(
    `${process.env.NEXT_PUBLIC_IMAGE_URL}${post.thumbnail}`,
  );
  const [statusArticle, setStatusArticle] = useState(post.status);

  const changeStatusHandler = () => {
    if (statusArticle) {
      console.log('abc');
    }
    setStatusArticle(!statusArticle);
  };

  return (
    <div className="grid grid-cols-9 gap-1 bg-white hover:bg- px-3 py-1 font-medium items-center">
      {/* <span className="flex items-center">
        <Checkbox {...label} checked={post?.selected} onClick={() => handleCheckItemClick(post)} />
      </span> */}
      <span className="col-span-4 flex items-center w-[100%] py-1">
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
          <h6 className="text-textAdmin text-base">{truncate(`${post.title}`, 52)}</h6>
          {post.status ? (
            <Link href={`/posts/${post?.slug}`}>
              <span className="text-sm cursor-pointer hover:opacity-50">
                #
                {truncate(`${post?.slug}`, 36)}
              </span>
            </Link>
          ) : (
            <span className="text-sm">
              #
              {truncate(`${post?.slug}`, 36)}
            </span>
          )}
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
      <span className="ml-8">
        <Tooltip title="Switch status">
          <Switch
            checked={statusArticle}
            onChange={changeStatusHandler}
            color="default"
            className="text-red-400"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Tooltip>
      </span>
    </div>
  );
}

export default PostList;
