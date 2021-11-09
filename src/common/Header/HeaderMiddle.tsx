import React, { ReactElement } from 'react';

import { SearchIcon } from '@heroicons/react/solid';

function HeaderMiddle(): ReactElement {
  return (
    <div className="flex items-center md:border-2 md:shadow-md rounded-full text-blue-400">
      <input
        type="text"
        placeholder="Where are you going"
        className="flex flex-1  pl-5 bg-transparent outline-none"
      />
      <SearchIcon className="hidden md:inline-flex h-8 bg-blue-400 rounded-full p-2 md:mx-2 cursor-pointer text-white" />
    </div>
  );
}

export default HeaderMiddle;
