import React from 'react';
import Footer from '../Components/Footer';

import Header from '../Components/Header/Header';
import TagSection from '../Components/TagContent/TagSection';
import { LayoutProps } from '../modals';

export function MainLayout({ children }: LayoutProps) {
  return (
    <div className="antialiased w-full float-left block bg-white">
      <Header />
      <div className="mainContent mt-[163px] lg:mt-[100px] md:mt-[100px] sm:mt-[100px] ssm:mt-[100px] bg-white relative">
        {children}
        <TagSection />
      </div>
      <Footer />
    </div>
  );
}
