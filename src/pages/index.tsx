/* eslint-disable no-param-reassign */
import React from 'react';

import Image from 'next/image';
// import Link from 'next/link';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  return (
    <div className="mr-16">
      <p className="text-4xl pb-6 text-blue-500">Create diagrams online realtime collaboration!</p>
      <div className="flex w-full bg-white rounded-md h-20 items-center p-3">
        <Image
          src="/images/post2.jpg"
          alt="Picture of the author"
          className="flex rounded-full"
          width={50}
          height={50}
        />
        <input
          type="text"
          onChange={() => {}}
          defaultValue=""
          placeholder="What are you thinking?"
          className="w-full text-white py-3 bg-blue-300 placeholder-white rounded-full ml-3 text-md box-border px-6 hover:bg-blue-400 cursor-pointer"
          onClick={() => router.push('/user/create')}
        />
      </div>
      <div className="mt-4 ">
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium text-gray-700">Recent posts</div>
          {/* <Link href="#">
            <a className="text-sm text-blue-400">View all</a>
          </Link> */}
        </div>
        <div className="grid grid-cols-3 h-40 gap-10 pt-4 mb-10">
          <div className="relative w-full h-full bg-white p-4 rounded-md shadow-md cursor-pointer hover:transform hover:scale-105 transition-all">
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
          <div className="relative w-full h-full bg-white p-4 rounded-md shadow-md cursor-pointer hover:transform hover:scale-105 transition-all">
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
          <div className="relative w-full h-full bg-white p-4 rounded-md shadow-md cursor-pointer hover:transform hover:scale-105 transition-all">
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
