import React, { ReactElement } from 'react';

import Link from 'next/link';

function FollowTag({ data, titleTagName }: any): ReactElement {
  return (
    <div className="tagContent">
      <p className="border-none p-3 rounded-lg w-full flex items-center justify-center bg-blueCyanLogo text-white my-6">
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
