import React, { ReactElement } from 'react';
import LayoutAdminPage from '../../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import PostList from '../../../Components/admin/components/PostList';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import AdvancedSearch from '../../../Components/admin/components/AdvancedSearch';

function AllPost(): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <LayoutAdminPage title="Home">
      <HeaderAdmin
        titlePage="Blogs"
        subTitlePage="Danh sách bài viết 20"
        searchPlaceholder="Tên bài viết..."
      />
      <AdvancedSearch />
      <div className="bg-white rounded p-4 px-6">
        <h4 className="pb-4 mb-4 border-b-2 border-gray-600">All posts</h4>
        <div className="grid grid-cols-8 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} />
            </span>
            <span className="flex-1">STT</span>
          </span>
          <span className="col-span-4">Tiêu đề</span>
          <span>Tác giả</span>
          <span>Ngày duyệt</span>
          <span>Trạng thái</span>
        </div>
        <PostList />
        <PostList />
        <PostList />
        <PostList />
        <PostList />
        <PostList />
        <PostList />
        <PostList />
      </div>
    </LayoutAdminPage>
  );
}

export default AllPost;
