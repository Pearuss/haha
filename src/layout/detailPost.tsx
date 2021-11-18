import React from 'react';

import Header from '../common/Header/Header';
import TagSection from '../common/TagContent/TagSection';
import { LayoutProps } from '../modals';

export function DetailPostLayout({ children }: LayoutProps) {
  return (
    <div className="w-full px-7">
      <Header />
      <div className="flex">
        <div className="flex w-[70vw]">{children}</div>
        <div className="w-[30vw]">
          <TagSection />
        </div>
      </div>
    </div>
  );
}
