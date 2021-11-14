import React, { ReactElement } from 'react';

import { BriefcaseIcon, EyeIcon, HeartIcon, ChatIcon } from '@heroicons/react/solid';
import Image from 'next/image';

function PostDetail({ dataPostDetail }: any): ReactElement {
  return (
    <div className="relative bg-white rounded-lg h-[23vw] shadow-md px-4 py-2">
      <div className="flex items-center">
        <Image
          src="/images/post1.jpg"
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
      <div className="mx-2">{dataPostDetail.body}</div>
      <div className="flex items-center justify-evenly absolute bottom-[4%] left-0 right-0 text-gray-800">
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
