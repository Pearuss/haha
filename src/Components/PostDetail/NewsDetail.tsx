/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

import { useAuth } from '../../hooks';
import { truncateBody, timeAgo } from '../../utilities/helper';
import CodeBlock from './CodeBlock';
import useSWR from 'swr';

function PostDetail({ dataPostDetail }: any) {
  const router = useRouter();
  const article = dataPostDetail.data;
  console.log(article);

  return (
    <div className="relative bg-white rounded-lg shadow-md px-4 pt-2 py-16 mb-8 text-gray-600  h-auto">
      <div className="w-full text-black font-semibold text-3xl sm:text-2xl ssm:text-xl pl-2 py-4 mx-auto">
        {article?.title}
      </div>
      <div className="flex items-center pl-2">
        <Image
          src="/images/toc2.jpg"
          width={48}
          height={48}
          objectFit="cover"
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
