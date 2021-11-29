import React from 'react';
import Auth from '../common/Auth/auth';

import Header from '../common/Header/Header';
import { LayoutProps } from '../modals';

export function HeaderLayout({ children }: LayoutProps) {
  return (
    <Auth className="antialiased w-full">
      <Header />
      <div className="mainContent mt-[163px]">{children}</div>
    </Auth>
  );
}
