/* eslint-disable  */
import React from 'react';

// import { DefaultTheme } from 'styled-components';
import { Actions } from '@paljs/ui/Actions';
import ContextMenu from '@paljs/ui/ContextMenu';
import { LayoutHeader } from '@paljs/ui/Layout';
import User from '@paljs/ui/User';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface HeaderProps {
  toggleSidebar: () => void;
  // theme: {
  //   set: (value: DefaultTheme['name']) => void;
  //   value: DefaultTheme['name'];
  // };
  changeDir: () => void;
  dir: 'rtl' | 'ltr';
}

const Header: React.FC<HeaderProps> = (props) => {
  const router = useRouter();

  return (
    <LayoutHeader fixed>
      <div className="flex w-full justify-between">
        <Actions
          size="Medium"
          actions={[
            {
              icon: { name: 'menu-2-outline' },
              url: {
                onClick: props.toggleSidebar,
              },
            },
            {
              content: (
                <Link href="/">
                  <div className="relative items-center cursor-pointer max-w-[150px] w-[150px] md:h-[38px] md:mt-1 sm:mt-[5px] sm:h-[35px] sm:ml-[-4rem] ssm:h-[32px] ssm:ml-[-5rem] h-[45px] max-h-[35px]">
                    <Image src="/logo.svg" layout="fill" priority />
                  </div>
                </Link>
              ),
            },
          ]}
        />
        <Actions
          size="Small"
          className="right"
          actions={[
            {
              content: (
                <ContextMenu
                  nextJs
                  style={{ cursor: 'pointer' }}
                  placement="bottom"
                  currentPath={router.pathname}
                  items={[
                    { title: 'Go to User', link: { href: '/' } },
                    { title: 'Log out', link: { href: '/adminpanel/logout' } },
                  ]}
                  Link={Link}
                >
                  <User
                    image="url('/images/person1.jpg')"
                    name="Thong Nguyen"
                    title="Admin"
                    size="Medium"
                  />
                </ContextMenu>
              ),
            },
          ]}
        />
      </div>
    </LayoutHeader>
  );
};
export default Header;
