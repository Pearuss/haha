import React, { ReactElement } from 'react';
import LayoutAdminPage from '../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import AdminList from '../../Components/admin/components/AdminList';
import HeaderAdmin from '../../Components/admin/components/HeaderAdmin';

function Cpanel(): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <LayoutAdminPage title="Home">
      <HeaderAdmin
        titlePage="Cpanel Users"
        subTitlePage="Danh sách quản trị viên"
        searchPlaceholder="Email quản trị viên..."
      />

      <div className="bg-white rounded h-full p-4 px-6">
        <h4 className="pb-4 mb-4 border-b-2 border-gray-600">Tài khoản quản trị viên</h4>
        <div className="grid grid-cols-7 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} />
            </span>
            <span className="flex-1">Mã</span>
          </span>
          <span className="col-span-2">Email</span>
          <span>Họ tên</span>
          <span>Quyền</span>
          <span>Ngày tạo</span>
          <span>Trạng thái</span>
        </div>
        <AdminList />
        <AdminList />
        <AdminList />
        <AdminList />
      </div>
    </LayoutAdminPage>
  );
}

export default Cpanel;
