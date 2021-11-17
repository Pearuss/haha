/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

import Swal from 'sweetalert2';
import { FilterMyPosts } from '../../../common/FilterMyPosts';
import Post from '../../../common/Post';
import useFetch from '../../../hooks/use-fetch';
import { MyPostLayout } from '../../../layout';

interface PostItem {
  id: string;
  title: string;
  img: string;
  body: string;
}

function PostsPage({ posts }: any) {
  const [dataPosts, setDataPosts] = useState<PostItem[]>(posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(false);

  const router = useRouter();

  const dataNoFilter = useRef<any[]>(posts);

  const onClickNoFilter = () => {
    setDataPosts(dataNoFilter.current);
  };

  const onClickFilter = (tagName: any) => {
    setDataPosts(dataNoFilter.current.filter((post: any) => post.tags === tagName));
  };

  const loadMorePost = () => {
    const fetchMorePosts = async () => {
      const { data } = await useFetch(
        `http://localhost:3000/posts/?_page=${currentPage + 1}&_limit=5`
      );

      if (data.length > 0) {
        setDataPosts((state) => {
          dataNoFilter.current = [...state, ...data];
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

    router.push(`/user/posts/?page=${currentPage + 1}`, undefined, { shallow: true });
    fetchMorePosts();
  };

  return (
    <div className="flex w-[70vw]">
      <div className="w-[17.5vw] mt-0">
        <FilterMyPosts
          onClickNoFilter={onClickNoFilter}
          onClickFilter={onClickFilter}
          setFilter={setFilter}
        />
      </div>
      <div className="w-[50vw]">
        <p className="leading-8 text-gray-700 font-medium text-base">Home/My Post</p>
        <h1 className="mb-6">Thong's Posts</h1>
        {dataPosts.length > 0 ? (
          dataPosts?.map((post: PostItem) => <Post key={post.id} post={post} />)
        ) : (
          <p className="text-lg text-red-600">There are no posts to display !</p>
        )}

        {!filter && (
          <button
            className="btnLoadMore float-right rounded-3xl bg-mainColor font-semibold text-gray-800 text-xl py-3 px-5 hover:opacity-70"
            onClick={loadMorePost}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
}

PostsPage.Layout = MyPostLayout;

export default PostsPage;

// export async function getStaticProps() {
//   const res = await fetch('http://localhost:3001/posts/?_page=1&_limit=5');
//   const posts = await res.json();

//   return {
//     props: { posts: posts?.data },
//   };
// }
