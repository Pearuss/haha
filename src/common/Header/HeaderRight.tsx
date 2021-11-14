import React, { ReactElement } from 'react';

import { GlobeAltIcon, UserCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';

function HeaderRight(): ReactElement {
  return (
    <div className="flex items-center justify-end text-blue-400 gap-5 pr-2">
      <GlobeAltIcon className="h-6 cursor-pointer" />
      <div className="userDropdown" data-dropdown>
        {/* <MenuIcon className="h-6 cursor-pointer" /> */}
        <div className="userLink" data-dropdown-button>
          <UserCircleIcon className="h-8 cursor-pointer" />
          Pearuss
        </div>
        <div className="userDropdown-menu">
          <div className="flex flex-col gap-1">
            <Link href="/user/create">
              <a className="link hover:text-white">Create post</a>
            </Link>
            <Link href="/user/posts">
              <a className="link hover:text-white">My posts</a>
            </Link>
            <Link href="#">
              <a className="link hover:text-white">Profile</a>
            </Link>
            <Link href="#">
              <a className="link hover:text-white">Logout</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderRight;
