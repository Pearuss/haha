import React from 'react';

import Header from '../common/Header/Header';
import { LayoutProps } from '../modals';

export function DetailPostLayout({ children }: LayoutProps) {
  return (
    <div className="antialiased w-full bg-white">
      <Header />
      <div className="mainContent mt-[30px] bg-white relative">{children}</div>
    </div>
  );
}
