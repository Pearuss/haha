import React from 'react';

import Auth from '../Components/Auth/auth';
import Footer from '../Components/Footer';
import Header from '../Components/Header/Header';
import TagSection from '../Components/TagContent/TagSection';
import { LayoutProps } from '../modals';

export function AdminLayout({ children }: LayoutProps) {
  return (
    <Auth className="antialiased w-full">
      <Header />
      <div className="mainContent mt-[163px] bg-white">
        {children}
        <TagSection />
      </div>
      <Footer />
    </Auth>
  );
}
