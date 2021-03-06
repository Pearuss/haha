import React from 'react';

import AdminAuth from '../Components/Auth/admin-auth';
import Footer from '../Components/Footer';
import Header from '../Components/Header/Header';
import TagSection from '../Components/TagContent/TagSection';
import { LayoutProps } from '../models';

export function AdminLayout({ children }: LayoutProps) {
  return (
    <AdminAuth className="antialiased w-full float-left block bg-white">
      <Header />
      <div className="mainContent mt-[163px] lg:mt-[110px] md:mt-[110px] sm:mt-[110px] ssm:mt-[110px] bg-white relative">
        {children}
        <TagSection />
      </div>
      <Footer />
    </AdminAuth>
  );
}
