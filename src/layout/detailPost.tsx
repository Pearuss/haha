import React from 'react';
import Footer from '../common/Footer';

import Header from '../common/Header/Header';
import TagSection from '../common/TagContent/TagSection';
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
