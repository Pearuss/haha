/* eslint-disable */
import React from 'react';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import CodeBlock from './CodeBlock';
import { timeAgo } from '../../utilities/helper';

function PostDetail({ dataPostDetail }: any) {
  const article = dataPostDetail.data;
  return (
    <div className="relative bg-white rounded-lg shadow-md px-4 pt-2 py-16 mb-8 text-gray-600  h-auto">
      <div className="w-full text-black font-semibold text-3xl sm:text-2xl ssm:text-xl pl-2 py-4 mx-auto">
        {article?.title}
      </div>
      <div className="flex items-center pl-2">
        <Image
          loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/admin-logo.jpg`}
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/admin-logo.jpg`}
          width={48}
          height={48}
          objectFit="cover"
          alt="Avatar"
          className="rounded-full"
          priority
        />
        <span className="font-medium text-xl ml-2 text-blueCyanLogo">Admin</span>
        <span className="text-gray-500 text-sm ml-1 mt-1">
          • {timeAgo(new Date(article?.createdAt))}
        </span>
      </div>

      <div className="postContent mx-2 mb-4 mt-5 h-auto">
        <ReactMarkdown components={CodeBlock} children={article?.content} />
      </div>
    </div>
  );
}
// PostDetail.Layout = MainLayout;
export default PostDetail;
