import React from 'react';

import Auth from '../Components/Auth/auth';
import Footer from '../Components/Footer';
import Header from '../Components/Header/Header';
import TagSection from '../Components/TagContent/TagSection';
import { LayoutProps } from '../models';

export function UserLayout({ children }: LayoutProps) {
  return (
    <Auth className="antialiased w-full">
      <Header />
      <div className="mainContent mt-[163px] lg:mt-[100px] md:mt-[100px] sm:mt-[100px] ssm:mt-[100px] bg-white relative">
        {children}
        <TagSection />
      </div>
      <Footer />
    </Auth>
  );
}
