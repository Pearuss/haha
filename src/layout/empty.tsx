import React from 'react';
import Footer from '../common/Footer';

import { LayoutProps } from '../modals';

export function EmptyLayout({ children }: LayoutProps) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
