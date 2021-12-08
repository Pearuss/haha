import React, { ReactElement } from 'react';
import LayoutAdminPage from '../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import HeaderAdmin from '../../Components/admin/components/HeaderAdmin';
import AdvancedSearch from '../../Components/admin/components/AdvancedSearch';
import TagList from '../../Components/admin/components/TagList';

function Tag(): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <LayoutAdminPage title="Home">
      <HeaderAdmin titlePage="Hashtag" subTitlePage="Total 12" searchPlaceholder="Search tag..." />
      <AdvancedSearch />
      <div className="bg-white rounded p-4 px-6">
        <div className="flex justify-between pb-4 mb-4 border-b-2 border-gray-600">
          <h4 className="">Hashtag list</h4>
          <div className="">Xóa</div>
        </div>
        <div className="grid grid-cols-6 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} />
            </span>
            <span className="flex-1">STT</span>
          </span>
          <span>Tag Name</span>
          <span>Ngày tạo</span>
          <span className="col-span-2">Mô tả</span>
          <span>Trạng thái</span>
        </div>
        <TagList />
        <TagList />
        <TagList />
      </div>
    </LayoutAdminPage>
  );
}

export default Tag;
