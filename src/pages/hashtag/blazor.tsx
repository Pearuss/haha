import React, { ReactElement } from 'react';

import { MainLayout } from '../../layout';

function Blazor(): ReactElement {
  return <div>Blazor Tag</div>;
}
Blazor.Layout = MainLayout;
export default Blazor;
