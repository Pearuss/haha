import React from 'react';

import HeaderAdmin from '../../Components/admin/components/HeaderAdmin';
// import Header from '../../Components/admin/common/Header';
import LayoutAdmin from '../../Components/admin/layout/index';

function Dashboard() {
  return (
    <LayoutAdmin title="Home">
      <HeaderAdmin titlePage="Dashboard" subTitlePage="" searchPlaceholder="Email..." showSearch={false} />
    </LayoutAdmin>
  );
}

export default Dashboard;
