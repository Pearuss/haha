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
      <p className="text-3xl font-bold">Thong's Posts</p>
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
