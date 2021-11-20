import React, { ReactElement } from 'react';

import Menu from '../Menu';
import HeaderLeft from './HeaderLeft';
import HeaderMiddle from './HeaderMiddle';
import HeaderRight from './HeaderRight';

// interface Props {}

function Header(): ReactElement {
  return (
    <div className="sticky w-full top-0 z-50">
      <header className="w-full grid grid-cols-3 px-10 py-2 bg-white">
        <HeaderLeft />
        <HeaderMiddle />
        <HeaderRight />
      </header>
      <Menu />
    </div>
  );
}

export default Header;
