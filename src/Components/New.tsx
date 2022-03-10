/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

import Link from 'next/link';

import { truncate, formatDate } from '../utilities/helper';

function New({ _new }: { _new: any }) {
  return (
    <Link href={`/news/${_new?.id}`}>
      <div className="relative flex ssm:flex-col w-full  h-auto bg-white rounded-lg px-3 py-5 mb-4 cursor-pointer ssm:border ssm:border-gray-300 ssm:p-4">
        <div className="flex-1 ml-5 relative cursor-auto ssm:w-full ssm:flex ssm:items-center ssm:flex-col ssm:ml-0 text-gray-900">
          <div className="relative w-full h-full min-h-[160px] 3xl:min-h-[140px] lg:min-h-[170px] bg-white p-4 rounded-md shadow-sm cursor-pointer hover:transform hover:shadow-md transition-all duration-300 border-r border-b">
            <div className="font-medium pb-1 text-black">{truncate(`${_new?.title}`, 60)}</div>
            <div className="mb-2 xl:mb-4 lg:mb-5 md:mb-5">
              {truncate(`${_new?.shortContent}`, 112)}
            </div>

            <div className="absolute text-sm bottom-2 right-4 text-gray-700">
              <span>Admin</span>
              <span className="ml-3">|</span>
              <span className="ml-3">{formatDate(new Date(_new?.createdAt))}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default New;
