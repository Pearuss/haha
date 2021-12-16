import React, { useEffect } from 'react';

import HeaderLeft from './HeaderLeft';
import HeaderMiddle from './HeaderMiddle';
import HeaderRight from './HeaderRight';
import Menu from './Menu';

function Header() {
  useEffect(() => {
    const header: any = document.querySelector('.header');
    let lastScrollTop = 0;
    window.addEventListener(
      'scroll',
      () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;

        if (st > lastScrollTop) {
          header.classList.remove('xl:top-0', '2xl:top-0', '3xl:top-0');
          header.classList.add('xl:-top-15', '2xl:-top-15', '3xl:-top-15');
        } else {
          header.classList.add('xl:top-0', '2xl:top-0', '3xl:top-0');
          header.classList.remove('xl:-top-15', '2xl:-top-15', '3xl:-top-15');
        }
        lastScrollTop = st <= 0 ? 0 : st;
      },
      false,
    );
  }, []);

  return (
    <div className="header fixed transform transition-all duration-200 ease-in-out w-full top-0 z-50 border-b border-gray-300 shadow-md bg-white">
      <header className="w-full grid grid-cols-3 ssm:grid-cols-2 px-10 pt-4 py-2 md:px-4 md:pt-3  ">
        <HeaderLeft />
        <HeaderMiddle />
        <HeaderRight />
      </header>
      <Menu />
    </div>
  );
}

export default Header;
