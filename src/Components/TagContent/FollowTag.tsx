/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { Tag } from '../../models';

interface FollowTagProp {
  data: Tag[];
  titleTagName: string;
}

function FollowTag({ data, titleTagName }: FollowTagProp) {
  const [tagFollow, setTagFollow] = useState<Tag[]>([]);
  useEffect(() => {
    if (data) {
      setTagFollow(data);
    }
  }, [data]);
  return (
    <div className="tagContent">
      <p className="p-3 rounded-lg w-full flex items-center justify-center border-2 border-blueCyanLogo my-6 text-blueCyanLogo">
        {titleTagName}
      </p>
      <p className="flex w-full flex-wrap">
        {tagFollow?.map((tag: Tag) => (
          <Link href={`/tag${tag.slug}`} key={tag.id}>
            <div className="">#{tag.name}</div>
          </Link>
        ))}
      </p>
    </div>
  );
}

export default FollowTag;
