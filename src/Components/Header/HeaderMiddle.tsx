import React, { ReactElement } from 'react';

import { SearchIcon } from '@heroicons/react/solid';

function HeaderMiddle(): ReactElement {
  return (
    <div className="flex items-center border-2 md:border-0 sm:border-0 sm:shadow-none md:shadow-none shadow-sm rounded-full text-blueCyanLogo ssm:hidden">
      <input
        type="text"
        placeholder="What are you looking for ?"
        className="flex flex-1  pl-5 bg-transparent outline-none ssm:hidden"
      />
      <SearchIcon className="md:hidden sm:hidden  inline-flex h-8 bg-blueCyanLogo rounded-full p-2 mx-2 cursor-pointer text-white" />
    </div>
  );
}

export default HeaderMiddle;
