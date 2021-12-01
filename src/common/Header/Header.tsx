import React, { ReactElement, useEffect } from 'react';

import Menu from '../Menu';
import HeaderLeft from './HeaderLeft';
import HeaderMiddle from './HeaderMiddle';
import HeaderRight from './HeaderRight';

// interface Props {}

const Header = (): ReactElement => {
  useEffect(() => {
    const header: any = document.querySelector('.header');
    let lastScrollTop = 0;
    window.addEventListener(
      'scroll',
      () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        // if (window.scrollY == 0) {
        //   header.classList.add('top-0');
        //   header.classList.remove('-top-18');
        //   return;
        // }

        if (st > lastScrollTop) {
          header.classList.remove('top-0');
          header.classList.add('-top-18');
        } else {
          header.classList.add('top-0');
          header.classList.remove('-top-18');
        }
        lastScrollTop = st <= 0 ? 0 : st;
      },
      false
    );
  }, []);

  return (
    <div className="header transform transition-all duration-200 ease-in-out fixed w-full top-0 z-50 border-b border-gray-300 shadow-md bg-white">
      <header className="w-full grid grid-cols-3 ssm:grid-cols-2 px-10 pt-4 py-2 md:px-4 md:pt-3  ">
        <HeaderLeft />
        <HeaderMiddle />
        <HeaderRight />
      </header>
      <Menu />
    </div>
  );
};

export default Header;
