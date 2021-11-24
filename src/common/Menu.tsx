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
      menuMobile.classList.remove('md:-translate-x-full');
      menuMobile.classList.add('md:translate-x-0');
      menuMobile.classList.remove('sm:-translate-x-full');
      menuMobile.classList.add('sm:translate-x-0');
      menuMobile.classList.remove('ssm:-translate-x-full');
      menuMobile.classList.add('ssm:translate-x-0');
      cover.classList.remove('hidden');
    });

    btnCloseMenuMb?.addEventListener('click', () => {
      menuMobile.classList.add('md:-translate-x-full');
      menuMobile.classList.remove('md:translate-x-0');
      menuMobile.classList.add('sm:-translate-x-full');
      menuMobile.classList.remove('sm:translate-x-0');
      menuMobile.classList.add('ssm:-translate-x-full');
      menuMobile.classList.remove('ssm:translate-x-0');
      cover.classList.add('hidden');
    });

    cover?.addEventListener('click', () => {
      menuMobile.classList.add('md:-translate-x-full');
      menuMobile.classList.remove('md:translate-x-0');
      menuMobile.classList.add('sm:-translate-x-full');
      menuMobile.classList.remove('sm:translate-x-0');
      menuMobile.classList.add('ssm:-translate-x-full');
      menuMobile.classList.remove('ssm:translate-x-0');
      cover.classList.add('hidden');
    });
  }, []);

  return (
    <>
      {/* cover */}
      <div className="cover hidden absolute top-0 left-0 w-[100vw] h-[100vh] bg-gray-600 bg-opacity-30 z-40"></div>

      {/* Mobile menu */}
      <div className="absolute border-r text-gray-600 font-semibold border-gray-300 shadow-lg z-50 bg-white w-[35vw] h-[100vh] text-center menuMobile top-0 left-0 -translate-x-full transform transition duration-200 ease-in-out md:-translate-x-full sm:-translate-x-full sm:w-[45vw] ssm:-translate-x-full ssm:w-[70vw]">
        <div className="flex p-4 items-center border-b border-gray-300">
          <CloseIcon className="ml-1 mr-9 btnCloseMenuMb" />
          <div className="relative flex items-center cursor-pointer pt-4 ml-[-2rem] max-w-[250px] w-[250px] md:h-[38px] md:mt-1 h-[45px] max-h-[45px]">
            <Image src="/logo.svg" layout="fill" priority />
          </div>
        </div>
        <li
          className={`${
            router.pathname === '/home' ? 'active dropdown' : 'dropdown'
          } py-4 px-6 border-b border-gray-300`}
          data-dropdown
        >
          <Link href="/">
            <a data-dropdown-button className="cursor-pointer ssm:text-xs">Home</a>
          </Link>
        </li>
        <li
          className={`${
            router.pathname === '/operator' ? 'active dropdown' : 'dropdown'
          } py-4 px-6 border-b border-gray-300`}
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
          } py-4 px-6 border-b border-gray-300`}
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
          } py-4 px-6 border-b border-gray-300`}
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
          } py-4 px-6 border-b border-gray-300`}
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
          } py-4 px-6 border-b border-gray-300`}
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
          } py-4 px-6 border-b border-gray-300`}
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
          } py-4 px-6 border-b border-gray-300`}
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
      <div className="w-max text-gray-600 font-semibold flex gap-10 3xl:gap-9 2xl:gap-7 xl:gap-2  lg:gap-0 mx-auto py-5 rounded-2xl md:hidden sm:hidden ssm:hidden">
        <li className={router.pathname === '/home' ? 'active dropdown' : 'dropdown'} data-dropdown>
          <Link href="/">
            <a data-dropdown-button>
              Home
            </a>
          </Link>
        </li>
        <li
          className={router.pathname === '/operator' ? 'active dropdown' : 'dropdown'}
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
