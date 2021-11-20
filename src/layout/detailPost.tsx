import React from 'react';

import Header from '../common/Header/Header';
import TagSection from '../common/TagContent/TagSection';
import { LayoutProps } from '../modals';

export function DetailPostLayout({ children }: LayoutProps) {
  return (
    <div className="w-full antialiased">
      <Header />
      <div className="flex pt-4">
        <div className="flex w-[68vw]">{children}</div>
        <div className="w-[28vw]">
          <TagSection />
        </div>
      </div>
    </div>

  );
}
