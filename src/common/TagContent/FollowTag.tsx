import React, { ReactElement } from 'react';

import Link from 'next/link';

function FollowTag({ data, titleTagName }: any): ReactElement {
  return (
    <div className="tagContent">
      <p className="border border-blue-500 p-3 rounded-full w-full flex items-center justify-center bg-blue-300 active:bg-blue-300 active:text-white hover:text-white font-semibold my-6">
        {titleTagName}
      </p>
      <p className="flex w-full flex-wrap">
        {data?.map((tag: any) => (
          <Link href={`/hashtag${tag.path}`} key={tag.id}>
            <div className="">#{tag.name}</div>
          </Link>
        ))}
      </p>
    </div>
  );
}

export default FollowTag;
