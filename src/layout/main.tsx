import React from 'react';

import Header from '../common/Header/Header';
import TagSection from '../common/TagContent/TagSection';
import { LayoutProps } from '../modals';

export function MainLayout({ children }: LayoutProps) {
  return (
    <div className="antialiased w-full">
      <Header />
      <div className="mainContent">
        {children}
        <TagSection />
      </div>
    </div>
  );
}
