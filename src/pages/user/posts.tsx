/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';

import Swal from 'sweetalert2';
import Post from '../../common/Post';
import useFetch from '../../hooks/use-fetch';
import { MyPostLayout } from '../../layout';

interface PostItem {
  id: string;
  title: string;
  img: string;
  body: string;
}

function PostsPage({ posts }: any) {
  const [dataPosts, setDataPosts] = useState<PostItem[]>(posts);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMorePost = () => {
    const fetchMorePosts = async () => {
      const data = await useFetch(`http://localhost:3001/posts/?_page=${currentPage + 1}&_limit=5`);

      if (data.length > 0) {
        setDataPosts((state) => {
          return [...state, ...data];
        });

        setCurrentPage((state) => {
          return state + 1;
        });
      } else {
        const btnLoadMore: any = document.querySelector('.btnLoadMore');

        btnLoadMore.classList.add('active');
        btnLoadMore.disabled = true;
        Swal.fire('No more posts.');
      }
    };
    fetchMorePosts();
  };

  return (
    <div className="mr-16">
      <p className="leading-8 text-gray-700 font-medium text-base">Home/My Post</p>
      <h1 className="mb-6">Thong's Posts</h1>
      {dataPosts?.map((post: PostItem) => (
        <Post key={post.id} post={post} />
      ))}
      <button
        className="btnLoadMore float-right rounded-3xl bg-mainColor font-semibold text-gray-800 text-xl py-3 px-5 hover:opacity-70"
        onClick={loadMorePost}
      >
        Load more
      </button>
    </div>
  );
}

PostsPage.Layout = MyPostLayout;

export default PostsPage;

export async function getStaticProps() {
  const res = await fetch('http://localhost:3001/posts/?_page=1&_limit=5');
  const posts = await res.json();
  return {
    props: { posts },
  };
}
