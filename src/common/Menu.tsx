import React, { ReactElement } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

// interface Props {

// }

function Menu(): ReactElement {
  const router = useRouter();

  const { data } = useSWR('http://localhost:3001/menu', { revalidateOnFocus: false });

  return (
    <div className="w-max text-gray-600 font-semibold flex gap-10 3xl:gap-9 2xl:gap-7 xl:gap-2  lg:gap-0 mx-auto py-5 rounded-2xl md:hidden sm:hidden ssm:hidden">
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
      <li className={router.pathname === '/design' ? 'active dropdown' : 'dropdown'} data-dropdown>
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
    </div>
  );
}

export default Menu;
