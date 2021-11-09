import React, { ReactElement } from 'react';

import Image from 'next/image';

function CommentSection({ comment }: any): ReactElement {
  return (
    <div className="flex w-full items-center shadow-sm bg-white rounded-lg relative mb-4">
      <div className="absolute top-3 left-2">
        <Image
          src="/images/post1.jpg"
          width={52}
          height={52}
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <div className="ml-2 pl-16 py-3">
        <span className="text-lg text-blue-300 font-medium">{comment.name}</span>
        <p>{comment.content}</p>
      </div>
    </div>
  );
}

export default CommentSection;
