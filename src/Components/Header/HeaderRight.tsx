/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';

import { UserCircleIcon, MenuIcon, SearchIcon } from '@heroicons/react/solid';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import { useAuth } from '../../hooks';
import useToggle from '../../hooks/use-toggle';

function HeaderRight() {
  const router = useRouter();
  const { logout, profile, firstLoading } = useAuth();

  const [isLogin, setIsLogin] = useState(false);
  const [showSearchInput, setShowSearchInput] = useToggle(false);

  const logoutHandler = useCallback(async () => {
    try {
      await logout();
      router.replace('/');
      if (router.pathname === '/') {
        Swal.fire('Logout success!');
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!firstLoading && !profile?.data) {
      setIsLogin(false);
    } else if (profile?.data) {
      if (profile.data.status === 0) {
        logoutHandler();
        setTimeout(() => {
          Swal.fire('Account is locking');
        }, 500);
      }
      setIsLogin(true);
    }
  }, [profile, firstLoading]);

  return (
    <div className="userMenu relative flex items-center justify-end text-blueCyanLogo gap-4 ssm:gap-2 ">
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

      <MenuIcon className="hidden btnMenuMobile h-6 cursor-pointer sm:h-[22px] ssm:h-5 lg:inline-block md:inline-block sm:inline-block ssm:inline-block " />
      {isLogin ? (
        <div className="userDropdown ssm:mr-[-1.2rem]" data-dropdown-user>
          <div
            className="flex items-center gap-1 px-3 py-[5px] text-sm xl:py-1 xl:px-2 lg:py-1 lg:px-2 sm:text-xs md:py-1 md:px-2 ssm:text-[10px] ssm:px-1 ssm:py-1"
            data-dropdown-button-user
          >
            <UserCircleIcon className="h-8 pointer-events-none cursor-pointer text-lg md:h6 sm:h-5 ssm:h-4" />
            {profile?.data.authorName
              ? `${profile?.data.authorName}`
              : `${profile?.data.firstName} ${profile?.data.lastName}`}
            <ExpandMoreOutlinedIcon className="text-blueCyanLogo ml-2 pointer-events-none cursor-pointer" />
          </div>
          <div className={`userDropdown-menu ${isLogin ? '' : 'hidden'}`}>
            <div className="flex flex-col gap-1">
              <Link href={`/user/${profile?.data.userId}`}>
                <a className="link ">Profile</a>
              </Link>
              <Link href="/user/create">
                <a className="link ">Create post</a>
              </Link>
              <Link href="/user/posts/1">
                <a className="link ">My posts</a>
              </Link>
              <Link href="/news">
                <a className="link ">News</a>
              </Link>
              <Link href="/following-tags">
                <a className="link ">Following tags</a>
              </Link>
              {profile?.data?.role > 25 && (
                <Link href="/adminpanel/dashboard">
                  <a className="link ">Administrator</a>
                </Link>
              )}
              <div className="link  hover:rounded-full" onClick={logoutHandler} aria-hidden="true">
                Log out
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Link href="/login">
          <div className="userDropdown ssm:mr-[-1.2rem]" data-dropdown-user>
            <div
              className="flex items-center gap-1 px-3 py-[6px] text-sm xl:py-1 xl:px-2 lg:py-1 lg:px-2 sm:text-xs md:py-1 md:px-2 ssm:text-[10px] ssm:px-1 ssm:py-1"
              data-dropdown-button-user
            >
              <UserCircleIcon className="h-8 pointer-events-none cursor-pointer text-lg md:h6 sm:h-5 ssm:h-4" />
              Login
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default HeaderRight;
