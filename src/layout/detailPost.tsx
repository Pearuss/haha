import React from 'react';

import Header from '../common/Header/Header';
import TagSection from '../common/TagContent/TagSection';
import { ContentIndex } from '../common/ContentIndex';
import { LayoutProps } from '../modals';

export function DetailPostLayout({ children }: LayoutProps) {
  return (
    <div className="">
      <Header />
      <div className="flex">
        <div className="w-1/5 px-5">
          <ContentIndex />
        </div>
        <div className="w-1/2">{children}</div>
        <div className="w-1/4">
          <TagSection />
        </div>
      </div>
    </div>
  );
}
