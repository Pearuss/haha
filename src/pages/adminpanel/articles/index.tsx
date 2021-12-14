import React, { ReactElement } from 'react';
import LayoutAdminPage from '../../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import PostItem from '../../../Components/admin/components/PostItem';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import AdvancedSearch from '../../../Components/admin/components/AdvancedSearch';
import Image from 'next/image';

function AllPost({ data }: any): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <LayoutAdminPage title="Post">
      <HeaderAdmin titlePage="Article" subTitlePage="" searchPlaceholder="Article title..." />
      <AdvancedSearch />
      <div className="bg-white rounded p-4 px-6 min-w-[1167px]">
        <div className="flex pb-4 mb-4 border-b-2 border-gray-500 items-center">
          <h4>All article</h4>
          <span className="text-sm mt-2 ml-2">(20)</span>
          <div className="flex gap-4 ml-auto mt-2 pr-3">
            <Image src="/images/share.png" width={20} height={20} />
            <Image src="/images/delete.png" width={20} height={20} />
          </div>
        </div>
        <div className="grid grid-cols-8 gap-1 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="">
            {/* <span className="flex-1"> */}
            <Checkbox {...label} />
            {/* </span> */}
          </span>
          <span className="col-span-3 ml-[-12%]">Title</span>
          <span>Public at</span>
          <span>Author</span>
          <span className="">Status</span>
          <span className="">Statistics</span>
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
        inWorks: post.inWorks,
        likes: post.likes,
        comments: post.comments,
      })),
    },
    revalidate: 1,
  };
};
