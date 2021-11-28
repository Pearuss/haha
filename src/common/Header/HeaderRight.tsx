import React, { ReactElement, useCallback } from 'react';

import { GlobeAltIcon, UserCircleIcon, MenuIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import useToggle from '../../hooks/use-toggle';

import { useAuth } from '../../hooks';

function HeaderRight(): ReactElement {
  const router = useRouter();
  const { logout } = useAuth();

  const [showSearchInput, setShowSearchInput] = useToggle(false);

  const logoutHandler = useCallback(async () => {
    try {
      await logout();
      router.push('/');
      if (router.pathname === '/') {
        Swal.fire('Logout success!');
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="userMenu relative flex items-center justify-end text-blue-400 gap-4 ssm:gap-2">
      <Link href="/login">
        <button
          type="button"
          className="bg-transparent rounded-full py-2 px-3 cursor-pointer  outline-none hover:bg-blue-100 active:animate-jelly lg:hidden md:hidden sm:hidden ssm:hidden "
        >
          Become a Host
        </button>
      </Link>
      {showSearchInput && (
        <input
          className="changePlaceholder absolute outline-none py-1 px-3 w-[50vw] bottom-[-3rem] right-0 rounded-3xl bg-blue-100"
          placeholder="What are you looking for ?"
        />
      )}
      <SearchIcon
        className="hidden ssm:inline-flex h-[18px] cursor-pointer"
        onClick={setShowSearchInput}
      />
      <GlobeAltIcon className="h-6 cursor-pointer md:hidden sm:hidden ssm:hidden" />
      <MenuIcon className="hidden btnMenuMobile h-6 cursor-pointer sm:h-[22px] ssm:h-5 md:inline-block sm:inline-block ssm:inline-block" />
      <div className="userDropdown ssm:mr-[-1.2rem]" data-dropdown>
        <div className="userLink text-sm sm:text-xs ssm:text-[10px]" data-dropdown-button>
          <UserCircleIcon className="h-8 cursor-pointer md:h6 sm:h-5 ssm:h-4" />
          {/* <GlobeAltIcon className="h-6 cursor-pointer md:h-5" />
      <MenuIcon className="hidden btnMenuMobile h-6 cursor-pointer md:block sm:block ssm:block" />
      <div className="userDropdown" data-dropdown>
        <div className="userLink text-sm" data-dropdown-button>
          <UserCircleIcon className="h-8 cursor-pointer md:h6" /> */}
          Pearuss
        </div>
        <div className="userDropdown-menu">
          <div className="flex flex-col gap-1">
          <Link href="/login">
              <a className="xl:hidden 2xl:hidden 3xl:hidden link hover:text-white">Login</a>
            </Link>
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
              className="link hover:bg-gray-300 hover:text-white hover:rounded-full"
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
