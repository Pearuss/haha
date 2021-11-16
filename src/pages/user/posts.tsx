/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import Post from '../../common/Post';
import { AdminLayout } from '../../layout';

interface PostItem {
  id: string;
  title: string;
  img: string;
  body: string;
}

function PostsPage({ posts }: any) {
  return (
    <div className="mr-16">
      <p className="leading-8 text-gray-700 font-medium text-base">Home/My Post</p>
      <h1>Thong's Posts</h1>
      {posts?.map((post: PostItem) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

PostsPage.Layout = AdminLayout;

export default PostsPage;

export async function getStaticProps() {
  const res = await fetch('http://localhost:3001/posts');
  const posts = await res.json();
  return {
    props: { posts },
  };
}
