/* eslint-disable no-param-reassign */
import React from 'react';

import Image from 'next/image';
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
      <div className="flex w-full bg-white rounded-md h-16 items-center p-3">
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
      <div className="grid grid-cols-4 h-20 gap-10 pt-4 mb-20">
        <textarea className="w-full h-full" />
        <textarea className="w-full h-full" />
        <textarea className="w-full h-full" />
        <textarea className="w-full h-full" />
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
