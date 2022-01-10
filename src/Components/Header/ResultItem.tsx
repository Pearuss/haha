import React from 'react';

import Link from 'next/link';

import { formatDate, truncate } from '../../utilities/helper';

export default function ResultItem({ result }: any) {
  const linkDetail = `/posts/${result?.id}`;
  const date = new Date(result.publishedAt);
  return (
    <Link href={linkDetail} key={result?.id}>
      <div className="w-full px-5 py-2 hover:bg-gray-100 cursor-pointer">
        <p>{truncate(result.title, 80)}</p>
        <div className="flex justify-between">
          <p className="text-grayText text-sm">{`${result.author.lastName} ${result.author.firstName}`}</p>
          <p className="text-grayText text-sm">{formatDate(date)}</p>
        </div>
      </div>
    </Link>
  );
}
