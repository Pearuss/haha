import React from 'react';

import Auth from '../common/Auth/auth';
import Header from '../common/Header/Header';
import TagSection from '../common/TagContent/TagSection';
import { LayoutProps } from '../modals';

export function AdminLayout({ children }: LayoutProps) {
  return (
    <Auth className="antialiased w-full">
      <Header />
      <div className="mainContent mt-[163px] bg-white">
        {children}
        <TagSection />
      </div>
    </Auth>
  );
}
