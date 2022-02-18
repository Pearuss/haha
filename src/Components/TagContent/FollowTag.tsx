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
  const isFollowingTitle = titleTagName === "Following Tags" ? true : false
  useEffect(() => {
    if (data) {
      setTagFollow(data);
    }
  }, [data]);
  return (
    <>
      <Link href="/following-tags">
        <div className="tagContent">
          <p className={`p-3 rounded-lg w-full flex items-center justify-center border-2 border-blueCyanLogo my-6 text-blueCyanLogo ${isFollowingTitle ? 'hover:animate-jelly hover:text-opacity-80 cursor-pointer': 'cursor-pointer'}`}>
            {titleTagName}
          </p>
          <p className="flex w-full flex-wrap">
            {tagFollow?.map((tag: Tag) => (
              <Link href={`/tag${tag.slug}`} key={tag.id}>
                <div>#{tag.name}</div>
              </Link>
            ))}
          </p>
        </div>
      </Link>
    </>
  );
}

export default FollowTag;
