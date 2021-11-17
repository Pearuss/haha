/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import Swal from 'sweetalert2';
import useSWR from 'swr';
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

function PostsPage() {
  const router = useRouter();

  const { data }: any = useSWR(`http://localhost:3001/posts?_page=${router.query.page}&_limit=5`, {
    revalidateOnFocus: false,
  });
  const { data: dataAll }: any = useSWR(`http://localhost:3001/posts`, {
    revalidateOnFocus: false,
  });

  const dataNoFilter = useRef<any>(dataAll);

  const [dataPosts, setDataPosts] = useState<PostItem[]>(data?.data);
  const [currentPage, setCurrentPage] = useState<number>(Number(router.query.page));
  const [filter, setFilter] = useState(false);

  const totalPage = 3;

  useEffect(() => {
    setDataPosts(data?.data);
  }, [data]);

  useEffect(() => {
    dataNoFilter.current = dataAll;
  }, [dataAll]);

  useEffect(() => {
    const btnLoadMore: any = document.querySelector('.btnLoadMore');

    btnLoadMore.classList.remove('disable');
    btnLoadMore.disabled = false;

    const { page }: any = router.query;
    setCurrentPage(Number(page));
  }, [router.query.page]);

  useEffect(() => {
    const btnPrevPage: any = document.querySelector('.btnPrevPage');
    const btnLoadMore: any = document.querySelector('.btnLoadMore');

    if (Number(router.query.page) <= 1 || Number(router.query.page) > totalPage) {
      btnPrevPage.classList.add('disable');
      btnPrevPage.disabled = true;
      btnLoadMore.classList.remove('disable');
      btnPrevPage.disabled = false;
      router.push(`/user/posts/${1}`, undefined, { shallow: true });
      setCurrentPage(1);
    } else {
      btnPrevPage.classList.remove('disable');
      btnPrevPage.disabled = false;
    }
  }, [router.query.page]);

  const onClickNoFilter = () => {
    setDataPosts(dataNoFilter.current);
  };

  const onClickFilter = (tagName: any) => {
    setDataPosts(dataNoFilter.current?.filter((post: any) => post.tags === tagName));
  };

  const loadMorePost = () => {
    const fetchMorePosts = async () => {
      const { data } = await useFetch(
        `http://localhost:3001/posts/?_page=${currentPage + 1}&_limit=5`
      );

      if (data.length > 0) {
        setCurrentPage((state) => {
          return state + 1;
        });

        router.push(`/user/posts/${currentPage + 1}`, undefined, { shallow: false });
      } else {
        const btnLoadMore: any = document.querySelector('.btnLoadMore');

        btnLoadMore.classList.add('disable');
        btnLoadMore.disabled = true;
        Swal.fire('No more posts.');
      }
    };

    fetchMorePosts();
  };

  const prevPagePost = () => {
    const fetchPosts = async () => {
      const { data } = await useFetch(
        `http://localhost:3001/posts/?_page=${currentPage - 1}&_limit=5`
      );

      if (currentPage > 1) {
        setDataPosts((state) => {
          return [...state, ...data];
        });

        setCurrentPage((state) => {
          return state + 1;
        });

        router.push(`/user/posts/${currentPage - 1}`, undefined, { shallow: false });
      }
    };
    fetchPosts();
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
        {dataPosts?.length > 0 ? (
          dataPosts?.map((post: PostItem) => <Post key={post.id} post={post} />)
        ) : (
          <p className="text-lg text-red-600">There are no posts to display !</p>
        )}

        {!filter && (
          <div className="flex justify-between">
            <button
              className="btnPrevPage float-right rounded-3xl bg-mainColor font-semibold text-gray-800 text-xl py-3 px-5 hover:opacity-70"
              onClick={prevPagePost}
            >
              Prev page
            </button>
            <button
              className="btnLoadMore float-right rounded-3xl bg-mainColor font-semibold text-gray-800 text-xl py-3 px-5 hover:opacity-70"
              onClick={loadMorePost}
            >
              Next page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

PostsPage.Layout = MyPostLayout;

export default PostsPage;
