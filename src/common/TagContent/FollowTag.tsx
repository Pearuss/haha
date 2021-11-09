import React, { ReactElement } from 'react';

import Link from 'next/link';

function FollowTag({ data }: any): ReactElement {
  return (
    <div className="tagContent">
      <p className="border border-blue-500 p-3 rounded-full pl-[43%] bg-blue-300 active:bg-blue-300 active:text-white hover:text-white font-semibold">
        Following Tags
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
