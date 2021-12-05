import React from 'react';
import Footer from '../Components/Footer';

import Header from '../Components/Header/Header';
import TagSection from '../Components/TagContent/TagSection';
import { LayoutProps } from '../modals';

export function DetailPostLayout({ children }: LayoutProps) {
  return (
    <div className="antialiased w-full bg-white">
      <Header />
      <div className="mainDetailContent mt-[163px] bg-white relative">
        {children}
        <TagSection />
      </div>
      <Footer />
    </div>
  );
}
