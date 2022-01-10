import React from 'react';

import Auth from '../Components/Auth/auth';
import Footer from '../Components/Footer';
import Header from '../Components/Header/Header';
import { LayoutProps } from '../models';

export function HeaderLayout({ children }: LayoutProps) {
  return (
    <Auth className="antialiased w-full">
      <Header />
      <div className="mainContent mt-[126px] lg:mt-[100px] md:mt-[100px] sm:mt-[100px] ssm:mt-[100px]">
        {children}
      </div>
      <Footer />
    </Auth>
  );
}
