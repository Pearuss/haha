import React, { ReactElement } from 'react';

import { EyeIcon, ChatIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { truncate } from '../utilities/helper';

function Post({ post }: any): ReactElement {
  const linkDetail = `/posts/${post.id}`;
  return (
    <Link href={linkDetail} key={post.id}>
      <div className="relative flex ssm:flex-col w-full ssm:h-auto ssm:max-h-full h-[280px] max-h-[280px] bg-white rounded-lg px-3 py-5 mb-4 cursor-pointer ssm:border ssm:border-gray-300 ssm:p-4 ssm:pb-20">
        <div className="relative max-w-[200px] ssm:max-w-full ssm:w-full w-[200px] ssm:min-h-[200px] h-auto">
          <Image
            className="rounded-md ssm:h-full"
            src="/images/toc2.jpg"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="flex-1 ml-5 relative cursor-auto ssm:w-full ssm:flex ssm:items-center ssm:flex-col ssm:ml-0 text-gray-600">
          <h3 className="text-lg text-blue-700 font-medium ssm:my-2">{post.title}</h3>
          <p className="text-base pt-1 text-gray-700">{truncate(`${post.body}`, 220)}</p>

          <div className="flex items-center absolute bottom-0 right-[2%] ssm:bottom-[-4.2rem] ssm:right-0 ssm:text-[14px]">
            <div className="flex items-center pr-6 ssm:pr-3">
              <EyeIcon className="h-5 ssm:h-4" />
              <span className="pl-3 ssm:pl-2">{post.views}</span>
            </div>
            <div className="flex items-center">
              <ChatIcon className="h-5 ssm:h-4" />
              <span className="pl-3 ssm:pl-2">{post.comments}</span>
            </div>
          </div>
          <p className="absolute bottom-8 ssm:bottom-[-2.2rem] ssm:right-0 ssm:text-sm tracking-wide ">
            12 Feb 2020
          </p>
          <p className="absolute bottom-0 ssm:bottom-[-4.2rem] ssm:left-0 ssm:text-sm ">
            {post.tags} - {post.author}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Post;
