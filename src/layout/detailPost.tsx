import React from 'react';

import Header from '../common/Header/Header';
import { LayoutProps } from '../modals';

export function DetailPostLayout({ children }: LayoutProps) {
  return (
    <div className="antialiased w-full bg-white">
      <Header />
      <div className="mainDetailContent mt-[163px] bg-white relative">{children}</div>
    </div>
  );
}
