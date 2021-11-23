import React, { useEffect, useState } from 'react';

import ListIcon from '@mui/icons-material/List';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Header from '../common/Header/Header';
import TagSection from '../common/TagContent/TagSection';
import { LayoutProps } from '../modals';

export function MainLayout({ children }: LayoutProps) {
  return (
    <div className="antialiased w-full bg-white">
      <Header />
      <div className="mainContent mt-[30px] bg-white relative">
        {children}
        <TagSection />
      </div>
    </div>
  );
}
