/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import Switch from '@material-ui/core/Switch';
import { IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';

import useFetch from '../../../hooks/use-fetch';
import { formatDate, truncate } from '../../../utilities/helper';

function PostList({ post }: any) {
  const [imgArticle, setImgArticle] = useState(
    `${process.env.NEXT_PUBLIC_IMAGE_URL}${post.thumbnail}`,
  );
  const [statusArticle, setStatusArticle] = useState(post.status);

  const changeStatusHandler = () => {
    Swal.fire({
      title: 'Are you sure change status this article?',
      showCancelButton: true,
      confirmButtonText: 'Ok',
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (statusArticle) {
          const res = await useFetch(`/api/v1/user/article/change-status/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify({
              status: 0,
            }),
          });
          if (res?.message === 200) {
            Swal.fire('Successfully!');
            setStatusArticle(false);
          } else {
            Swal.fire('Something went wrong!');
          }
        } else {
          const res = await useFetch(`/api/v1/user/article/change-status/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify({
              status: 1,
            }),
          });
          if (res?.message === 200) {
            Swal.fire('Successfully!');
            setStatusArticle(true);
          } else {
            Swal.fire('Something went wrong!');
          }
        }
      }
    });
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
        {post.status !== 0 ? (
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
