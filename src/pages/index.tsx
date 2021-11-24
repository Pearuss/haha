/* eslint-disable no-param-reassign */
import React from 'react';

// import Link from 'next/link';
import Post from '../common/Post';
import { MainLayout } from '../layout';

// import { LayoutMeta } from 'next';

interface PostItem {
  id: string;
  title: string;
  img: string;
  body: string;
}

function HomePage({ data }: any) {
  return (
    <div className="mr-16 md:mr-0 sm:mr-0 ssm:mx-auto ssm:px-[2vw]">
      <p className="text-5xl 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-[40px] sm:text-[40px] ssm:text-3xl pb-6 text-blue-500 font-normal">
        Create diagrams online realtime collaboration!
      </p>
      <div className="mt-4 ">
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium text-gray-700">Recent posts</div>
          {/* <Link href="#">
            <a className="text-sm text-blue-400">View all</a>
          </Link> */}
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 ssm:grid-cols-1 sm:h-[10.5rem] xl:h-[10.5rem] h-40 gap-10 pt-4 mb-10 ssm:mx-auto">
          <div className="relative w-full h-full bg-white p-4 rounded-md shadow-md cursor-pointer hover:transform hover:scale-105 transition-all">
            <div className="font-medium text-blue-600 pb-1">Sunt aut facere repellat provident</div>
            <div className="text-gray-600 text-sm">
              Quia et suscipit suscipit recusandae consequuntur consequuntur consequuntur
              consequuntur ....
            </div>

            <div className="absolute bottom-1 right-4 text-gray-700 pb-2 text-xs">
              <span>ReactJs - Pearuss</span>
              <span className="ml-3">|</span>
              <span className="ml-3">12 Feb 2020 </span>
            </div>
          </div>
          <div className="relative w-full h-full bg-white p-4 rounded-md shadow-md cursor-pointer hover:transform hover:scale-105 transition-all ssm:hidden">
            <div className="font-medium text-blue-600 pb-1">Sunt aut facere repellat provident</div>
            <div className="text-gray-600 text-sm">
              Quia et suscipit suscipit recusandae consequuntur ....
            </div>

            <div className="absolute bottom-1 right-4 text-gray-700 pb-2 text-xs">
              <span>ReactJs - Pearuss</span>
              <span className="ml-3">|</span>
              <span className="ml-3">12 Feb 2020 </span>
            </div>
          </div>
          <div className="relative w-full h-full bg-white p-4 rounded-md shadow-md cursor-pointer hover:transform hover:scale-105 transition-all lg:hidden md:hidden xl:hidden sm:hidden ssm:hidden">
            <div className="font-medium text-blue-600 pb-1">Sunt aut facere repellat provident</div>
            <div className="text-gray-600 text-sm">
              Quia et suscipit suscipit recusandae consequuntur ....
            </div>

            <div className="absolute bottom-1 right-4 text-gray-700 pb-2 text-xs">
              <span>ReactJs - Pearuss</span>
              <span className="ml-3">|</span>
              <span className="ml-3">12 Feb 2020 </span>
            </div>
          </div>
        </div>
      </div>
      {data?.map((post: PostItem) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
HomePage.Layout = MainLayout;

export default HomePage;

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3001/posts');
  const posts = await res.json();

  return {
    props: {
      data: posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        body: post.body,
        views: post.views,
        comments: post.comments,
        tags: post.tags,
        author: post.author,
      })),
    },
    revalidate: 5,
  };
};
