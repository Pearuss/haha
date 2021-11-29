import React from 'react';

import Header from '../common/Header/Header';
import TagSection from '../common/TagContent/TagSection';
import { LayoutProps } from '../modals';

export function MainLayout({ children }: LayoutProps) {
  return (
    <div className="antialiased w-full float-left block bg-white">
      <Header />
      <div className="mainContent mt-[163px] bg-white relative">
        {children}
        <TagSection />
      </div>
    </div>
  );
}
