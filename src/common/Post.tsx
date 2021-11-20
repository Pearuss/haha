import React, { ReactElement } from 'react';

import { EyeIcon, ChatIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { truncate } from '../utilities/helper';

function Post({ post }: any): ReactElement {
  const linkDetail = `/posts/${post.id}`;
  return (
    <Link href={linkDetail} key={post.id}>
      <div className="flex w-full h-56 bg-white rounded-lg px-3 py-5 mb-4 shadow-lg cursor-pointer hover:transform hover:scale-105 transition-all">
        <div className="relative max-w-full w-36 h-[184px] max-h-[184px] ">
          <Image
            className="rounded-md"
            src="/images/person1.jpg"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="flex-1 ml-5 relative cursor-auto">
          <h3 className="text-lg text-blue-700 font-medium">{post.title}</h3>
          <p className="text-base pt-1 text-gray-700">{truncate(`${post.body}`, 260)}</p>
          <div className="flex items-center absolute bottom-0 right-[12%] text-gray-600">
            <EyeIcon className="h-5" />
            <span className="pl-3">{post.views}</span>
          </div>
          <div className="flex items-center absolute bottom-0 right-[2%] text-gray-600">
            <ChatIcon className="h-5" />
            <span className="pl-3">{post.comments}</span>
          </div>

          <p className="absolute bottom-8 text-gray-600">12 Feb 2020</p>
          <p className="absolute bottom-0 text-gray-600">
            {post.tags} - {post.author}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Post;
