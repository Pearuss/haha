import React, { ReactElement } from 'react';
import LayoutAdminPage from '../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import ClientList from '../../Components/admin/components/ClientList';
import HeaderAdmin from '../../Components/admin/components/HeaderAdmin';

function Cpanel(): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <LayoutAdminPage title="Home">
      <HeaderAdmin
        titlePage="Khách hàng"
        subTitlePage="Tài khoản đăng kí khách hàng 6"
        searchPlaceholder="Email khách hàng..."
      />

      <div className="flex items-center gap-x-10 mb-10">
        <div className="flex-1 bg-white rounded h-full p-4 px-6">
          <h6 className="pb-4 mb-4 border-b-2 border-gray-600">Đang chờ xét duyệt</h6>
          <div className="grid grid-cols-5 bg-titleAdmin px-4 py-2 font-medium items-center rounded-sm">
            <span className="col-span-2">Email</span>
            <span className="col-span-2">Họ tên</span>
            <span>Ngày tạo</span>
          </div>
        </div>
        <div className="flex-1 bg-white rounded h-full p-4 px-6">
          <h6 className="pb-4 mb-4 border-b-2 border-gray-600">Đã xoá</h6>
          <div className="grid grid-cols-5 bg-titleAdmin px-4 py-2 font-medium items-center rounded-sm">
            <span className="col-span-2">Email</span>
            <span className="col-span-2">Họ tên</span>
            <span>Ngày xoá</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded h-full p-4 px-6">
        <h4 className="pb-4 mb-4 border-b-2 border-gray-600">Tài khoản khách hàng</h4>
        <div className="grid grid-cols-7 bg-titleAdmin px-3 py-1 font-medium items-center rounded-sm">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} />
            </span>
            <span className="flex-1">Mã</span>
          </span>
          <span className="col-span-2">Email</span>
          <span>Họ tên</span>
          <span>Số DT</span>
          <span>Ngày tạo</span>
          <span>Trạng thái</span>
        </div>
        <ClientList />
        <ClientList />
        <ClientList />
        <ClientList />
      </div>
    </LayoutAdminPage>
  );
}

export default Cpanel;
