import React, { ReactElement } from 'react';
import LayoutAdminPage from '../../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import PostItem from '../../../Components/admin/components/PostItem';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import AdvancedSearch from '../../../Components/admin/components/AdvancedSearch';

function AllPost({ data }: any): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  console.log(data);

  return (
    <LayoutAdminPage title="Post">
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
        {data?.map((post: any) => (
          <PostItem key={post.id} data={post} />
        ))}
      </div>
    </LayoutAdminPage>
  );
}

export default AllPost;

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3001/posts');
  const posts = await res.json();

  return {
    props: {
      data: posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        body: post.body,
        tags: post.tags,
        author: post.author,
        img: post.img,
      })),
    },
    revalidate: 1,
  };
};
