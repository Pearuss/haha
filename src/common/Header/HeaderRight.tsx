import React, { ReactElement } from 'react';

import { GlobeAltIcon, UserCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import { useAuth } from '../../hooks';

function HeaderRight(): ReactElement {
  const router = useRouter();
  const { logout } = useAuth();

  const logoutHandler = async () => {
    try {
      await logout();
      router.push('/');
      if (router.pathname === '/') {
        Swal.fire('Logout success!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-end text-blue-400 gap-4">
      <Link href="/login">
        <button
          type="button"
          className="bg-transparent rounded-full py-2 px-3 cursor-pointer  outline-none hover:bg-blue-100 active:animate-jelly "
        >
          Become a Host
        </button>
      </Link>
      <GlobeAltIcon className="h-6 cursor-pointer" />
      <div className="userDropdown" data-dropdown>
        {/* <MenuIcon className="h-6 cursor-pointer" /> */}
        <div className="userLink" data-dropdown-button>
          <UserCircleIcon className="h-8 cursor-pointer" />
          Pearuss
        </div>
        <div className="userDropdown-menu">
          <div className="flex flex-col gap-1">
            <Link href="/user/profile">
              <a className="link">Profile</a>
            </Link>
            <Link href="/user/create">
              <a className="link hover:text-white">Create post</a>
            </Link>
            <Link href="/user/posts">
              <a className="link hover:text-white">My posts</a>
            </Link>
            <div className="link logoutCustom" onClick={logoutHandler} aria-hidden="true">
              Log out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderRight;
