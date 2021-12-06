import React from 'react';
import Auth from '../Components/Auth/auth';
import Footer from '../Components/Footer';

import Header from '../Components/Header/Header';
import { LayoutProps } from '../modals';

export function HeaderLayout({ children }: LayoutProps) {
  return (
    <Auth className="antialiased w-full">
      <Header />
      <div className="mainContent mt-[126px]">{children}</div>
      <Footer />
    </Auth>
  );
}
