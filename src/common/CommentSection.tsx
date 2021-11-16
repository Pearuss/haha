import React, { ReactElement } from 'react';

import Image from 'next/image';
import { truncate } from '../utilities/helper';

function CommentSection({ comment }: any): ReactElement {
  return (
    <div className="flex w-full items-center shadow-sm bg-white rounded-lg relative mb-4">
      <div className="absolute top-3 left-2">
        <Image
          src="/images/toc2.jpg"
          width={52}
          height={52}
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <div className="ml-2 pl-16 py-3 w-full">
        <div className="flex justify-between ">
          <span className="text-lg text-blue-300 font-medium">{comment.name}</span>
          <span className="mr-4 text-sm font-medium text-gray-700">Feb 12</span>
        </div>
        <p>{truncate(`${comment.content}`, 200)}</p>
        <div className="mt-2 font-serif font-medium">See more</div>
        <div className="flex items-center justify-between text-gray-700 pt-2">
          <div className="flex items-center mr-6">
            <span className="flex items-center mr-4">
              <Image src="/images/star.png" width={20} height={20} />
              <span className="pl-3 font-medium">12</span>
            </span>
            <span className="flex items-center">
              <Image src="/images/smile.png" width={20} height={20} />
              <span className="pl-3 font-medium">12</span>
            </span>
          </div>
          <div className="flex items-center mr-6">
            <Image src="/images/reply.png" width={20} height={20} />
            <span className="pl-3 font-medium">Reply</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
