import React, { ReactElement } from 'react';
import LayoutAdminPage from '../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import CategoryList from '../../Components/admin/components/CategoryList';
import HeaderAdmin from '../../Components/admin/components/HeaderAdmin';

function Category(): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <LayoutAdminPage title="Home">
      <HeaderAdmin
        titlePage="Category"
        subTitlePage="Total 12"
        searchPlaceholder="Search category..."
      />

      <div className="bg-white rounded p-4 px-6">
        <h4 className="pb-4 mb-4 border-b-2 border-gray-600">Category list</h4>
        <div className="grid grid-cols-6 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} />
            </span>
            <span className="flex-1">STT</span>
          </span>
          <span>Category Name</span>
          <span>Ngày tạo</span>
          <span className="col-span-2">Mô tả</span>
          <span>Trạng thái</span>
        </div>
        <CategoryList />
        <CategoryList />
        <CategoryList />
      </div>
    </LayoutAdminPage>
  );
}

export default Category;
