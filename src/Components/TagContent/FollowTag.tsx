/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import Link from 'next/link';

import { Tag } from '../../models';

interface FollowTagProp {
  data: Tag[];
  titleTagName: string;
}

function FollowTag({ data, titleTagName }: FollowTagProp) {
  return (
    <div className="tagContent">
      <p className="p-3 rounded-lg w-full flex items-center justify-center border-2 border-blueCyanLogo my-6 text-blueCyanLogo">
        {titleTagName}
      </p>
      <p className="flex w-full flex-wrap">
        {data?.map((tag: Tag) => (
          <Link href={`/tag${tag.slug}`} key={tag.id}>
            <div className="">#{tag.name}</div>
          </Link>
        ))}
      </p>
    </div>
  );
}

export default FollowTag;
