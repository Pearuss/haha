import React, { ReactElement, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../common/CodeBlock';
import { BriefcaseIcon, EyeIcon, HeartIcon, ChatIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { truncateBody } from '../utilities/helper';
import { useAuth } from '../hooks';
import { useRouter } from 'next/router';

function PostDetail({ dataPostDetail, isReadMore, setIsReadMore }: any): ReactElement {
  const { profile } = useAuth();
  const router = useRouter();

  // const [isReadMore, setIsReadMore] = useState(true);

  let contentBody = isReadMore
    ? truncateBody(`${dataPostDetail.body}`, 580).toString() // max content length is 580
    : truncateBody(`${dataPostDetail.body}`, 20000).toString(); // see full content

  const ReadMoreHandler = useCallback(() => {
    if (profile?.message == 'You need to login to access') {
      router.replace('/login');
    } else if (profile?.username) {
      setIsReadMore(false);
    } else {
      router.replace('/login');
    }
  }, [profile]);
  return (
    <div className="relative bg-white rounded-lg shadow-md px-4 pt-2 py-16 mb-8 text-gray-700 h-auto">
      <div className="flex items-center">
        <Image
          src="/images/toc2.jpg"
          width={48}
          height={48}
          objectFit="cover"
          className="rounded-full"
          priority
        />
        <span className="font-medium text-xl ml-2 text-blue-300">{dataPostDetail.author}</span>
        <span className="text-gray-800 text-sm ml-1 mt-1">@{dataPostDetail.tags}· 21 hour</span>
      </div>
      <div className="w-max text-blue-400 font-semibold text-2xl mx-auto">
        {dataPostDetail.title}
      </div>
      {/* <div className="mx-2">{dataPostDetail.body}</div> */}
      <div className="mx-2 mb-4 mt-5 h-auto">
        <ReactMarkdown components={CodeBlock} children={contentBody} />
      </div>
      {dataPostDetail.body.length > 580 && (
        <button
          onClick={ReadMoreHandler}
          type="button"
          className={`ml-2 font-medium font-serif text-lg text-black cursor-pointer ${
            isReadMore ? '' : 'hidden'
          }`}
        >
          See more
        </button>
      )}
      <div className="flex items-center justify-evenly absolute bottom-[4%] mt - left-0 right-0 text-gray-800">
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="h-5 active:text-purple-800-500 hover:text-purple-800" />
          <span>{dataPostDetail.inWorks}</span>
        </div>
        <div className="flex items-center gap-2">
          <HeartIcon className="h-5 active:text-red-700 hover:text-red-700" />
          <span>{dataPostDetail.likes}</span>
        </div>
        <div className="flex items-center gap-2">
          <ChatIcon className="h-5 active:text-blue-500 hover:text-blue-500" />
          <span>{dataPostDetail.comments}</span>
        </div>
        <div className="flex items-center gap-2">
          <EyeIcon className="h-5 active:text-red-500 hover:text-red-700" />
          <span>{dataPostDetail.views}</span>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
