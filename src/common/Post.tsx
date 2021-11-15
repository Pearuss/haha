import React, { ReactElement } from 'react';

import { EyeIcon, ChatIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';

function Post({ post }: any): ReactElement {
  const linkDetail = `/posts/${post.id}`;
  return (
    <Link href={linkDetail} key={post.id}>
      <div className="flex w-full h-56 bg-white rounded-lg px-3 py-5 mb-4 shadow-lg cursor-pointer hover:transform hover:scale-105 transition-all">
        <Image
          className="w-1/5 rounded-md overflow-hidden"
          src="/images/post2.jpg"
          width="120%"
          height="100%"
          objectFit="fill"
          priority
        />
        <div className="flex-1 ml-4 relative cursor-auto">
          <h3 className="text-lg text-blue-700 font-medium">{post.title}</h3>
          <p className="text-base text-gray-800">{post.body}</p>
          <div className="flex items-center absolute bottom-0 right-[12%] text-gray-600">
            <EyeIcon className="h-5" />
            <span className="pl-3">{post.views}</span>
          </div>
          <div className="flex items-center absolute bottom-0 right-[2%] text-gray-600">
            <ChatIcon className="h-5" />
            <span className="pl-3">{post.comments}</span>
          </div>

          <p className="absolute bottom-8 text-gray-600">2020/08/25</p>
          <p className="absolute bottom-0 text-gray-600">
            {post.tags} - {post.author}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Post;
