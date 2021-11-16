import React from 'react';

import Header from '../common/Header/Header';
import TagSection from '../common/TagContent/TagSection';
import { LayoutProps } from '../modals';

export function DetailPostLayout({ children }: LayoutProps) {
  return (
    <div className="">
      <Header />
      <div className="flex">
        <div className="w-1/5 px-5">
          <div className="fixed top-40">
            <div className="text-gray-700 text-2xl font-semibold">Content index</div>
            <div className="flex flex-col pl-6">
              <ul className="contentIndex w-36"></ul>
            </div>
          </div>
        </div>
        <div className="w-1/2">{children}</div>
        <div className="w-1/4">
          <TagSection />
        </div>
      </div>
    </div>
  );
}
