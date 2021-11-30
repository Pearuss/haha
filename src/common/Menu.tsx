import React, { ReactElement, useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

function Menu(): ReactElement {
  const router = useRouter();

  const { data } = useSWR('http://localhost:3001/menu', { revalidateOnFocus: false });

  useEffect(() => {
    const btnMenuMobile = document.querySelector('.btnMenuMobile');
    const btnCloseMenuMb = document.querySelector('.btnCloseMenuMb');
    const menuMobile: any = document.querySelector('.menuMobile');
    const cover: any = document.querySelector('.cover');

    btnMenuMobile?.addEventListener('click', () => {
      menuMobile.classList.remove(
        'lg:-translate-x-full',
        'md:-translate-x-full',
        'sm:-translate-x-full',
        'ssm:-translate-x-full'
      );
      menuMobile.classList.add(
        'lg:translate-x-0',
        'md:translate-x-0',
        'sm:translate-x-0',
        'ssm:translate-x-0'
      );
      cover.classList.remove('hidden');
    });

    btnCloseMenuMb?.addEventListener('click', () => {
      menuMobile.classList.add(
        'lg:-translate-x-full',
        'md:-translate-x-full',
        'sm:-translate-x-full',
        'ssm:-translate-x-full'
      );
      menuMobile.classList.remove(
        'lg:translate-x-0',
        'md:translate-x-0',
        'sm:translate-x-0',
        'ssm:translate-x-0'
      );
      cover.classList.add('hidden');
    });

    cover?.addEventListener('click', () => {
      menuMobile.classList.add(
        'lg:-translate-x-full',
        'md:-translate-x-full',
        'sm:-translate-x-full',
        'ssm:-translate-x-full'
      );
      menuMobile.classList.remove(
        'lg:translate-x-0',
        'md:translate-x-0',
        'sm:translate-x-0',
        'ssm:translate-x-0'
      );
      cover.classList.add('hidden');
    });
  }, []);

  useEffect(() => {
    const menu: any = document.querySelector('.menuConfig');
    const menuMobile: any = document.querySelector('.menuMobile');

    menu.addEventListener('mouseover', (e: any) => {
      const isDropdownButton = e.target.matches('[data-dropdown-button]');
      if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

      let currentDropdown: any;
      if (isDropdownButton) {
        currentDropdown = e.target.closest('[data-dropdown]');
        currentDropdown.classList.toggle('activeClass');
      }

      document.querySelectorAll('[data-dropdown].activeClass').forEach((dropdown) => {
        if (dropdown === currentDropdown) return;
        dropdown.classList.remove('activeClass');
      });
    });
    menu.addEventListener('mouseleave', () => {
      document.querySelectorAll('[data-dropdown].activeClass').forEach((dropdown) => {
        dropdown.classList.remove('activeClass');
      });
    });
    menuMobile.addEventListener('click', (e: any) => {
      const isDropdownButton = e.target.matches('[data-dropdown-button]');
      if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

      let currentDropdown: any;
      if (isDropdownButton) {
        currentDropdown = e.target.closest('[data-dropdown]');
        currentDropdown.classList.toggle('activeClass');
      }

      document.querySelectorAll('[data-dropdown].activeClass').forEach((dropdown) => {
        if (dropdown === currentDropdown) return;
        dropdown.classList.remove('activeClass');
      });
    });
  }, []);

  return (
    <>
      {/* cover */}
      <div className="cover hidden absolute top-0 left-0 w-[100vw] h-[100vh] bg-gray-600 bg-opacity-30 z-40"></div>

      {/* Mobile menu */}
      <div className="menuMobile flex flex-col items-start absolute border-r text-black font-normal border-gray-300 shadow-lg z-50 bg-white w-[35vw] h-[100vh] text-center top-0 left-0 -translate-x-full transform transition duration-200 ease-in-out lg:-translate-x-full md:-translate-x-full sm:-translate-x-full sm:w-[40vw] md:w-[40vw] lg:w-[30vw] ssm:-translate-x-full ssm:w-[40vw]">
        <div className="flex p-4 items-center border-b border-gray-300 ssm:p-0">
          <CloseIcon className="ml-1 mr-9 btnCloseMenuMb" />
          <div className="relative flex items-center cursor-pointer pt-4 ml-[-2rem] max-w-[250px] w-[250px] ssm:max-w-[110px] sm:max-w-[200px] md:mt-1 h-[45px] max-h-[45px]">
            <Image src="/logo.svg" layout="fill" priority />
          </div>
        </div>
        {/* {router.pathname === '/posts/[id]' ? (
          ''
        ) : (
          <li className={`btnShowTag py-4 px-6 ssm:px-0 border-b border-gray-300`}>Tag Section</li>
        )} */}
        <li
          className={`btnShowTag w-full lg:hidden text-left py-4 px-16 lg:px-10 ssm:px-10 border-b border-gray-300 cursor-pointer ssm:text-xs`}
        >
          Tag Section
        </li>
        <li
          className={`${
            router.pathname === '/home' ? 'active dropdown' : 'dropdown'
          } w-full text-left py-4 px-6 ssm:px-0 border-b border-gray-300`}
          data-dropdown
        >
          <Link href="/">
            <a data-dropdown-button className="cursor-pointer ssm:text-xs">
              Home
            </a>
          </Link>
        </li>
        <li
          className={`${
            router.pathname === '/operator' ? 'active dropdown' : 'dropdown'
          } w-full text-left py-4 px-6 ssm:px-0 border-b border-gray-300`}
          data-dropdown
        >
          <a className="cursor-pointer ssm:text-xs" data-dropdown-button>
            Operator
          </a>

          <div className="dropdown-menu">
            <div className="flex flex-col gap-1">
              {data?.operator.map((result: any) => (
                <Link href={result.path} key={result.id}>
                  <a className="link">{result.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </li>
        <li
          className={`${
            router.pathname === '/security' ? 'active dropdown' : 'dropdown'
          } w-full text-left py-4 px-6 ssm:px-0 border-b border-gray-300`}
          data-dropdown
        >
          <a className="cursor-pointer ssm:text-xs" data-dropdown-button>
            Security
          </a>
          <div className="dropdown-menu">
            <div className="flex flex-col gap-1">
              {data?.security.map((result: any) => (
                <Link href={result.path} key={result.id}>
                  <a className="link">{result.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </li>
        <li
          className={`${
            router.pathname === '/development' ? 'active dropdown' : 'dropdown'
          } w-full text-left py-4 px-6 ssm:px-0 border-b border-gray-300`}
          data-dropdown
        >
          <a className="cursor-pointer ssm:text-xs" data-dropdown-button>
            Development
          </a>
          <div className="dropdown-menu">
            <div className="flex flex-col gap-1">
              {data?.development.map((result: any) => (
                <Link href={result.path} key={result.id}>
                  <a className="link">{result.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </li>
        <li
          className={`${
            router.pathname === '/cloudVirtual' ? 'active dropdown' : 'dropdown'
          } w-full text-left py-4 px-6 ssm:px-0 border-b border-gray-300`}
          data-dropdown
        >
          <a className="cursor-pointer ssm:text-xs" data-dropdown-button>
            Cloud Virtual
          </a>
          <div className="dropdown-menu">
            <div className="flex flex-col gap-1">
              {data?.cloudVirtual.map((result: any) => (
                <Link href={result.path} key={result.id}>
                  <a className="link">{result.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </li>
        <li
          className={`${
            router.pathname === '/management' ? 'active dropdown' : 'dropdown'
          } w-full text-left py-4 px-6 ssm:px-0 border-b border-gray-300`}
          data-dropdown
        >
          <a className="  cursor-pointer ssm:text-xs" data-dropdown-button>
            Management
          </a>
          <div className="dropdown-menu">
            <div className="flex flex-col gap-1">
              {data?.management.map((result: any) => (
                <Link href={result.path} key={result.id}>
                  <a className="link">{result.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </li>
        <li
          className={`${
            router.pathname === '/design' ? 'active dropdown' : 'dropdown'
          } w-full text-left py-4 px-6 ssm:px-0 border-b border-gray-300`}
          data-dropdown
        >
          <a className="  cursor-pointer ssm:text-xs" data-dropdown-button>
            Design
          </a>
          <div className="dropdown-menu">
            <div className="flex flex-col gap-1">
              {data?.design.map((result: any) => (
                <Link href={result.path} key={result.id}>
                  <a className="link">{result.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </li>
        <li
          className={`${
            router.pathname === '/tools' ? 'active dropdown' : 'dropdown'
          } w-full text-left py-4 px-6 ssm:px-0 border-b border-gray-300`}
          data-dropdown
        >
          <a className="  cursor-pointer ssm:text-xs" data-dropdown-button>
            Tools
          </a>
          <div className="dropdown-menu">
            <div className="flex flex-col gap-1">
              {data?.tools.map((result: any) => (
                <Link href={result.path} key={result.id}>
                  <a className="link">{result.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </li>
      </div>
      {/* Desktop menu */}
      <div className="menuConfig w-max text-black font-normal flex gap-10 3xl:gap-9 2xl:gap-7 xl:gap-2  lg:gap-0 mx-auto rounded-2xl lg:hidden md:hidden sm:hidden ssm:hidden">
        <li className={router.pathname === '/home' ? 'active dropdown' : 'dropdown'} data-dropdown>
          <Link href="/">
            <a data-dropdown-button>Home</a>
          </Link>
        </li>
        <li className={router.pathname === '/home' ? 'active dropdown' : 'dropdown'} data-dropdown>
          <a className="cursor-pointer ssm:text-xs" data-dropdown-button>
            Operator
          </a>

          <div className="dropdown-menu">
            <div className="flex flex-col gap-1">
              {data?.operator.map((result: any) => (
                <Link href={result.path} key={result.id}>
                  <a className="link">{result.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </li>
        <li
          className={router.pathname === '/security' ? 'active dropdown' : 'dropdown'}
          data-dropdown
        >
          <a className="cursor-pointer ssm:text-xs" data-dropdown-button>
            Security
          </a>

          <div className="dropdown-menu">
            <div className="flex flex-col gap-1">
              {data?.security.map((result: any) => (
                <Link href={result.path} key={result.id}>
                  <a className="link">{result.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </li>
        <li
          className={router.pathname === '/development' ? 'active dropdown' : 'dropdown'}
          data-dropdown
        >
          <a className="cursor-pointer ssm:text-xs" data-dropdown-button>
            Development
          </a>

          <div className="dropdown-menu">
            <div className="flex flex-col gap-1">
              {data?.development.map((result: any) => (
                <Link href={result.path} key={result.id}>
                  <a className="link">{result.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </li>
        <li
          className={router.pathname === '/cloudVirtual' ? 'active dropdown' : 'dropdown'}
          data-dropdown
        >
          <a className="cursor-pointer ssm:text-xs" data-dropdown-button>
            Cloud Virtual
          </a>

          <div className="dropdown-menu">
            <div className="flex flex-col gap-1">
              {data?.cloudVirtual.map((result: any) => (
                <Link href={result.path} key={result.id}>
                  <a className="link">{result.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </li>
        <li
          className={router.pathname === '/management' ? 'active dropdown' : 'dropdown'}
          data-dropdown
        >
          <a className="  cursor-pointer ssm:text-xs" data-dropdown-button>
            Management
          </a>

          <div className="dropdown-menu">
            <div className="flex flex-col gap-1">
              {data?.management.map((result: any) => (
                <Link href={result.path} key={result.id}>
                  <a className="link">{result.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </li>
        <li
          className={router.pathname === '/design' ? 'active dropdown' : 'dropdown'}
          data-dropdown
        >
          <a className="  cursor-pointer ssm:text-xs" data-dropdown-button>
            Design
          </a>

          <div className="dropdown-menu">
            <div className="flex flex-col gap-1">
              {data?.design.map((result: any) => (
                <Link href={result.path} key={result.id}>
                  <a className="link">{result.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </li>
        <li className={router.pathname === '/tools' ? 'active dropdown' : 'dropdown'} data-dropdown>
          <a className="  cursor-pointer ssm:text-xs" data-dropdown-button>
            Tools
          </a>

          <div className="dropdown-menu">
            <div className="flex flex-col gap-1">
              {data?.tools.map((result: any) => (
                <Link href={result.path} key={result.id}>
                  <a className="link">{result.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </li>
      </div>
    </>
  );
}

export default Menu;
