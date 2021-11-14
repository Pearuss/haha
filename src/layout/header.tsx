import React from 'react';

import Header from '../common/Header/Header';
import { LayoutProps } from '../modals';

export function HeaderLayout({ children }: LayoutProps) {
  return (
    <div className="antialiased w-full">
      <Header />
      <div className="mainContent">{children}</div>
    </div>
  );
}
