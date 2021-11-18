import { useRouter } from 'next/router';
import React from 'react';
import { paging } from '../utilities/helper';

export default function Pagination({ totalPage, currentPage }: any): any {
  const router = useRouter();

  const goOtherPage = (page: number) => {
    router.push(`/user/posts/${page}`);
  };

  return (
    <ul className="flex justify-center mt-5 mb-5">
      <li onClick={() => goOtherPage(Number(1))} className="px-4 py-2 cursor-pointer">
        first
      </li>
      {paging(currentPage, totalPage).map((page) => {
        if (page === currentPage)
          return (
            <li
              onClick={() => goOtherPage(Number(page))}
              className="px-5 py-2 bg-blue-500 cursor-pointer mx-2"
            >
              {page}
            </li>
          );
        else
          return (
            <li
              onClick={() => goOtherPage(Number(page))}
              className="px-4 py-2 cursor-pointer mx-2 bg-gray-400"
            >
              {page}
            </li>
          );
      })}
      <li onClick={() => goOtherPage(Number(totalPage))} className="px-4 py-2 cursor-pointer">
        last
      </li>
    </ul>
  );
}
