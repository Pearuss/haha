import React from 'react';

import Auth from '../common/Auth/auth';
import Header from '../common/Header/Header';
import TagSection from '../common/TagContent/TagSection';
import { FilterMyPosts } from '../common/FilterMyPosts';
import { LayoutProps } from '../modals';

export function MyPostLayout({ children }: LayoutProps) {
  return (
    <Auth className="antialiased w-full px-7">
      <Header />
      <div className="flex">
        <div className="w-[20vw] mt-0">
          <FilterMyPosts />
        </div>
        <div className="w-[50vw]">{children}</div>
        <div className="w-[30vw]">
          <TagSection />
        </div>
      </div>
    </Auth>
  );
}
