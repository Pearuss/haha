import React, { ReactElement } from 'react';
import LayoutAdminPage from '../../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import PostItem from '../../../Components/admin/components/PostItem';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import AdvancedSearch from '../../../Components/admin/components/AdvancedSearch';

function AllPost({ data }: any): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <LayoutAdminPage title="Post">
      <HeaderAdmin
        titlePage="Article"
        subTitlePage="Total number of articles 20"
        searchPlaceholder="Article title..."
      />
      <AdvancedSearch />
      <div className="bg-white rounded p-4 px-6 min-w-[1167px]">
        <h4 className="pb-4 mb-4 border-b-2 border-gray-600">All article</h4>
        <div className="grid grid-cols-8 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} />
            </span>
            <span className="flex-1">STT</span>
          </span>
          <span className="col-span-4">Title</span>
          <span>Author</span>
          <span>Approval date</span>
          <span>Status</span>
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
      data: posts?.map((post: any) => ({
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
