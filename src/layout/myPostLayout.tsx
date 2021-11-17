import React from 'react';

import Auth from '../common/Auth/auth';
import Header from '../common/Header/Header';
import TagSection from '../common/TagContent/TagSection';
import { LayoutProps } from '../modals';

export function MyPostLayout({ children }: LayoutProps) {
  return (
    <Auth className="antialiased w-full px-7">
      <Header />
      <div className="flex">
        <div className="w-[70vw]">{children}</div>
        <div className="w-[30vw]">
          <TagSection />
        </div>
      </div>
    </Auth>
  );
}
