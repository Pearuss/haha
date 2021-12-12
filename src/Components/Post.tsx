import React, { ReactElement } from 'react';

import { EyeIcon, ChatIcon } from '@heroicons/react/outline';
// import Image from 'next/image';
import Link from 'next/link';
import { truncate } from '../utilities/helper';

function Post({ post }: any): ReactElement {
  const linkDetail = `/posts/${post.id}`;
  return (
    <div className="relative flex ssm:flex-col w-full  ssm:max-h-full h-[210px] xl:h-[230px] lg:h-[310px] md:h-[240px] sm:h-[280px] max-h-[310px] ssm:h-auto bg-white rounded-lg px-3 py-5 mb-4 cursor-pointer ssm:border ssm:border-gray-300 ssm:p-4 ssm:pb-20">
      <div className="relative my-[0.4rem] overflow-hidden max-w-[200px] ssm:max-w-full ssm:w-full w-[200px] ssm:min-h-[200px] h-auto ">
        <img
          className="absolute inset-0 overflow-hidden rounded"
          // src="https://tranhuuthien.com/wp-content/uploads/2021/08/kieu-toc-dap-xu-nam-7.png"
          src={post.img}
          // layout="fill"
          // priority
        />
      </div>
      <div className="flex-1 ml-5 relative cursor-auto ssm:w-full ssm:flex ssm:items-center ssm:flex-col ssm:ml-0 text-gray-900">
        <Link href={linkDetail} key={post.id}>
          <h3 className="text-xl cursor-pointer text-black font-medium ssm:my-2">{post.title}</h3>
        </Link>
        <p className="text-base pt-1">{truncate(`${post.body}`, 220)}</p>

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
  );
}

export default Post;
