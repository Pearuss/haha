/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

import { EyeIcon, ChatIcon } from '@heroicons/react/outline';
// import Image from 'next/image';
import Link from 'next/link';

import { Article } from '../models';
import { truncate, formatDate } from '../utilities/helper';

function Post({ article }: { article: Article }) {
  const linkDetail = `/posts/${article?.id}`;

  return (
    <div className="relative flex ssm:flex-col w-full  ssm:max-h-full h-[210px] xl:h-[230px] lg:h-[310px] md:h-[240px] sm:h-[280px] max-h-[310px] ssm:h-auto bg-white rounded-lg px-3 py-5 mb-4 cursor-pointer ssm:border ssm:border-gray-300 ssm:p-4 ssm:pb-20">
      <div className="relative my-[0.4rem] overflow-hidden max-w-[200px] ssm:max-w-full ssm:w-full w-[200px] ssm:min-h-[200px] h-auto ">
        <img
          className="absolute inset-0 overflow-hidden rounded-sm"
          // src="http://localhost:3100/uploads/articles/202201/EMbXFEDrEd38I2PlStUX.jpg"
          src={`http://localhost:3100${article.thumbnail}`}
          alt="img"
          // src={post.img}
        />
      </div>
      <div className="flex-1 ml-5 relative cursor-auto ssm:w-full ssm:flex ssm:items-center ssm:flex-col ssm:ml-0 text-gray-900">
        <Link href={linkDetail} key={article?.id}>
          <h3 className="text-xl cursor-pointer text-black font-medium ssm:my-2">
            {article?.title}
          </h3>
        </Link>
        <p className="text-base pt-1">{truncate(`${article?.short_content}`, 220)}</p>

        <div className="flex items-center absolute bottom-0 right-[2%] ssm:bottom-[-4.2rem] ssm:right-0 ssm:text-[14px]">
          <div className="flex items-center pr-6 ssm:pr-3">
            <EyeIcon className="h-5 ssm:h-4" />
            <span className="pl-3 ssm:pl-2">{article?.view_count}</span>
          </div>
          <div className="flex items-center">
            <ChatIcon className="h-5 ssm:h-4" />
            <span className="pl-3 ssm:pl-2">{article?.countComment}</span>
          </div>
        </div>
        <p className="absolute bottom-8 ssm:bottom-[-2.2rem] ssm:right-0 ssm:text-sm tracking-wide ">
          {formatDate(new Date(article?.published_at))}
        </p>
        <p className="absolute bottom-0 ssm:bottom-[-4.2rem] ssm:left-0 ssm:text-sm ">
          {article?.mainCategory}
          {' '}
          -
          {`${article?.authorLastname} ${article?.authorFirstname}`}
        </p>
      </div>
    </div>
  );
}

export default Post;
