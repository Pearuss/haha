import React from 'react';
import Footer from '../Components/Footer';

import { LayoutProps } from '../modals';

export function EmptyLayout({ children }: LayoutProps) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
