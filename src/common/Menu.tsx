import React, { ReactElement, useEffect } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

// interface Props {

// }

function Menu(): ReactElement {
  const router = useRouter();

  const { data } = useSWR('http://localhost:3001/menu', { revalidateOnFocus: false });

  useEffect(() => {
    const btnMenu = document.querySelector('.btnMenu');
    const menuMobile: any = document.querySelector('.menuMobile');

    btnMenu?.addEventListener('click', () => {
      menuMobile.classList.remove('md:-translate-x-full');
    });
  });

  return (
    <>
      {/* <div className="absolute text-center menuMobile top-0 left-0 -translate-x-full transform md:-translate-x-full transition duration-200 ease-in-out">
        <p className="text-3xl font-medium">Menu</p>
        <li className={router.pathname === '/home' ? 'active dropdown' : 'dropdown'} data-dropdown>
          <Link href="/">
            <a data-dropdown-button>Home</a>
          </Link>
        </li>
        <li
          className={router.pathname === '/operator' ? 'active dropdown' : 'dropdown'}
          data-dropdown
        >
          <Link href="">
            <a className="cursor-pointer" data-dropdown-button>
              Operator
            </a>
          </Link>

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
          <Link href="">
            <a className="cursor-pointer" data-dropdown-button>
              Security
            </a>
          </Link>
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
          <Link href="">
            <a className="cursor-pointer" data-dropdown-button>
              Development
            </a>
          </Link>
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
          <Link href="">
            <a className="cursor-pointer" data-dropdown-button>
              Cloud Virtual
            </a>
          </Link>
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
          <Link href="">
            <a className="  cursor-pointer" data-dropdown-button>
              Management
            </a>
          </Link>
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
          <Link href="">
            <a className="  cursor-pointer" data-dropdown-button>
              Design
            </a>
          </Link>
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
          <Link href="">
            <a className="  cursor-pointer" data-dropdown-button>
              Tools
            </a>
          </Link>
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
      </div> */}
      <div className="w-max text-gray-600 font-semibold flex gap-10 3xl:gap-9 2xl:gap-4 xl:gap-2  lg:gap-0 mx-auto py-5 rounded-2xl md:hidden sm:hidden ssm:hidden">
        <li className={router.pathname === '/home' ? 'active dropdown' : 'dropdown'} data-dropdown>
          <Link href="/">
            <a data-dropdown-button>Home</a>
          </Link>
        </li>
        <li
          className={router.pathname === '/operator' ? 'active dropdown' : 'dropdown'}
          data-dropdown
        >
          <a className="cursor-pointer" data-dropdown-button>
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
          <a className="cursor-pointer" data-dropdown-button>
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
          <a className="cursor-pointer" data-dropdown-button>
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
          <a className="cursor-pointer" data-dropdown-button>
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
          <a className="  cursor-pointer" data-dropdown-button>
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
          <a className="  cursor-pointer" data-dropdown-button>
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
          <a className="  cursor-pointer" data-dropdown-button>
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
      {/* <div className="hidden w-full justify-between text-gray-700 font-semibold gap-10 3xl:gap-9 2xl:gap-7 xl:gap-2  lg:gap-0 px-5 py-5 rounded-2xl md:flex">
        <p>Menu</p>
        <div className="flex">
          <div className="btnMenu px-2">
            <MenuIcon />
          </div>
          <div className="px-2">
            <MoreVertIcon />
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Menu;
