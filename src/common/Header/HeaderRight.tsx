import React, { ReactElement } from 'react';

import { GlobeAltIcon, UserCircleIcon, MenuIcon } from '@heroicons/react/solid';
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
          className="bg-transparent rounded-full py-2 px-3 cursor-pointer  outline-none hover:bg-blue-100 active:animate-jelly md:hidden sm:hidden ssm:hidden "
        >
          Become a Host
        </button>
      </Link>
      <GlobeAltIcon className="h-6 cursor-pointer md:h-5" />
      <MenuIcon className="hidden btnMenuMobile h-6 cursor-pointer md:block sm:block ssm:block" />
      <div className="userDropdown" data-dropdown>
        <div className="userLink text-sm" data-dropdown-button>
          <UserCircleIcon className="h-8 cursor-pointer md:h6" />
          Pearuss
        </div>
        <div className="userDropdown-menu">
          <div className="flex flex-col gap-1">
            <Link href="/user/profile">
              <a className="link hover:text-white">Profile</a>
            </Link>
            <Link href="/user/create">
              <a className="link hover:text-white">Create post</a>
            </Link>
            <Link href="/user/posts/1">
              <a className="link hover:text-white">My posts</a>
            </Link>
            {/* {(profile?.isAdmin || false) && (
              <Link href="/user/admin">
                <a className="link hover:text-white">Moderator</a>
              </Link>
            )} */}
            <div
              className="link hover:bg-blue-300 hover:text-white hover:rounded-full"
              onClick={logoutHandler}
              aria-hidden="true"
            >
              Log out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderRight;
