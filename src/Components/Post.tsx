/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

import { EyeIcon, ChatIcon } from '@heroicons/react/outline';
// import Image from 'next/image';
import Link from 'next/link';

import { Article } from '../models';
import { truncate, formatDate } from '../utilities/helper';

function Post({ article }: { article: Article }) {
  const linkDetail = `/posts/${article?.slug}`;

  const tagArray = article?.articleTagNames?.split(',');
  const tagSlugArray = article?.articleTagSlugs?.split(',');
  // console.log(tagArray);
  // console.log(tagSlugArray);

  return (
    <div className="relative flex ssm:flex-col w-full  h-auto bg-white rounded-lg px-3 py-5 mb-4 cursor-pointer ssm:border ssm:border-gray-300 ssm:p-4 ssm:pb-20">
      <div className="relative mt-[0.4rem] overflow-hidden max-w-[200px] ssm:max-w-full ssm:w-full w-[200px] ssm:min-h-[200px] h-auto ">
        <Link href={linkDetail} key={article?.id}>
          <img
            className="absolute inset-0 overflow-hidden rounded-sm ssm:object-cover"
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${
              article?.thumbnail || '/uploads/articles/user.png'
            }`}
            alt={`${article?.title}`}
          />
        </Link>
      </div>
      <div className="flex-1 ml-5 relative cursor-auto ssm:w-full ssm:flex ssm:items-center ssm:flex-col ssm:ml-0 text-gray-900">
        <Link href={linkDetail} key={article?.id}>
          <h3 className="text-xl cursor-pointer text-black font-medium ssm:my-2 hover:opacity-70">
            {truncate(`${article?.title}`, 70)}
          </h3>
        </Link>
        <p className="text-base pt-1 pb-20 ssm:pb-2">
          {truncate(`${article?.short_content}`, 230)}
        </p>

        <div className="flex items-center absolute bottom-0 right-[2%] ssm:bottom-[-4.2rem] ssm:right-0 ssm:text-[14px]">
          <div className="flex items-center pr-6 ssm:pr-3">
            <EyeIcon className="h-[18px] ssm:[18px]" />
            <span className="pl-3 ssm:pl-2 text-[14px]">{article?.view_count}</span>
          </div>
          <div className="flex items-center">
            <ChatIcon className="h-[18px] ssm:h-4" />
            <span className="pl-3 ssm:pl-2 text-[14px]">{article?.countComment}</span>
          </div>
        </div>
        <p className="absolute bottom-8 ssm:bottom-[-2.2rem] ssm:right-0 ssm:text-sm tracking-wide flex items-center w-full mb-[2px]">
          <div className="flex items-center flex-1 w-full">
            {tagArray?.map((tag: any, index: number) => (
              <Link href={`/tag${tagSlugArray[index]}`} key={tag}>
                <span className="px-2 py-1 border border-gray-300 mr-2 text-xs rounded-md hover:bg-backgroundGrayTextTag cursor-pointer">
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
          <span className="text-sm mr-4">{formatDate(new Date(article?.published_at))}</span>
        </p>
        <p className="absolute bottom-0 ssm:bottom-[-4.2rem] ssm:left-0 ssm:text-sm">
          <Link href={`${article.slugCategory}`}>{article?.mainCategory}</Link> -{' '}
          <Link href={`/user/${article.author_id}`}>
            {article.authorName
              ? `${article.authorName}`
              : `${article.authorFirstname} ${article.authorLastname}`}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Post;
