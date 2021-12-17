import React from 'react';

import { SearchIcon } from '@heroicons/react/solid';

function HeaderAdmin({ titlePage, subTitlePage, searchPlaceholder }: any) {
  return (
    <div className="flex items-center mb-4">
      <h2 className="text-textAdmin">{titlePage}</h2>
      <span className="text-sm mt-3 ml-2">{subTitlePage}</span>
      <div className="flex bg-white items-center border-2 ml-auto  rounded-full text-gray-600">
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="flex flex-1  pl-5  bg-transparent outline-none py-3"
        />
        <SearchIcon className="flex h-8 bg-gray-400 rounded-full p-2 mx-2 cursor-pointer text-white" />
      </div>
    </div>
  );
}

export default HeaderAdmin;
