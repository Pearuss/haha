import React, { useEffect, useState } from 'react';

import ListIcon from '@mui/icons-material/List';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Header from '../common/Header/Header';
import TagSection from '../common/TagContent/TagSection';
import { LayoutProps } from '../modals';

export function MainLayout({ children }: LayoutProps) {
  const [isShowTag, setIsShowTag] = useState(false);

  useEffect(() => {
    const btnShowTag = document.querySelector('.btnShowTag');
    const btnHideTag = document.querySelector('.btnHideTag');

    btnShowTag?.addEventListener('click', () => {
      setIsShowTag(true);
    });

    btnHideTag?.addEventListener('click', () => {
      setIsShowTag(false);
    });
  }, [isShowTag]);
  return (
    <div className="antialiased w-full">
      <Header />
      <div className="mainContent relative">
        {children}
        <div className={`tagSection md:${isShowTag ? 'inline-block' : 'hidden'}`}>
          <TagSection />
        </div>
        <div className={`hidden md:block`}>
          {isShowTag ? (
            <CancelPresentationIcon
              color="action"
              className="btnHideTag fixed top-[12rem] text-4xl p-1 border-gray-600 border text-black hover:bg-gray-500 hover:shadow-"
            />
          ) : (
            <ListIcon
              color="action"
              className="btnShowTag fixed top-[12rem] text-4xl p-1 border-gray-600 border text-black hover:bg-gray-500 hover:shadow-"
            />
          )}
        </div>
      </div>
    </div>
  );
}
