/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { FilterMyPosts } from '../../../common/FilterMyPosts';
import Post from '../../../common/Post';
import { MainLayout } from '../../../layout';
import Pagination from '../../../common/Pagination';
import TagSectionobile from '../../../common/TagContent/TagSectionMobile';

interface PostItem {
  id: string;
  title: string;
  img: string;
  body: string;
}

function PostsPage() {
  const router = useRouter();

  const [isShowTagMobile, setIsShowTagMobile] = useState(false);

  const { data }: any = useSWR(`http://localhost:3001/posts?_page=${router.query.page}&_limit=5`, {
    revalidateOnFocus: false,
  });

  const { data: dataAll }: any = useSWR(`http://localhost:3001/posts`, {
    revalidateOnFocus: false,
  });

  const [dataPosts, setDataPosts] = useState<PostItem[]>([]);

  const [filter, setFilter] = useState(false);
  const totalPage = Math.ceil(Number(data?.pagination._totalRow) / 5);

  useEffect(() => {
    setDataPosts(data?.data);
  }, [data]);

  useEffect(() => {
    if (Number(router.query.page) < 1) {
      router.push(`/user/posts/1`);
    }
  }, [router.query.page]);

  useEffect(() => {
    const btnShowTag = document.querySelector('.btnShowTag');
    const menuMobile: any = document.querySelector('.menuMobile');
    const cover: any = document.querySelector('.cover');

    btnShowTag?.addEventListener('click', () => {
      setIsShowTagMobile(true);
      menuMobile.classList.add(
        'md:-translate-x-full',
        'sm:-translate-x-full',
        'ssm:-translate-x-full'
      );
      menuMobile.classList.remove('md:translate-x-0', 'sm:translate-x-0', 'ssm:translate-x-0');
    });

    cover.addEventListener('click', () => {
      cover.classList.add('hidden');
      setIsShowTagMobile(false);
    });
  }, []);

  const onClickNoFilter = () => {
    setDataPosts(dataAll);
  };

  const onClickFilter = (tagName: any) => {
    setDataPosts(dataAll?.filter((post: any) => post.tags === tagName));
  };

  return (
    <div className="mr-16 md:mr-0 sm:mr-0 ssm:mx-auto ssm:px-[2vw]">
      <div className="relative w-full">
        <p className="leading-8 text-gray-700 font-medium text-base">Home/My Post</p>
        <div className="mt-0 md:hidden sm:hidden ssm:hidden">
          <FilterMyPosts
            onClickNoFilter={onClickNoFilter}
            onClickFilter={onClickFilter}
            setFilter={setFilter}
          />
        </div>
        <h1 className="mb-6">Thong's Posts</h1>
      </div>
      {dataPosts?.length > 0 ? (
        dataPosts?.map((post: PostItem) => <Post key={post.id} post={post} />)
      ) : (
        <p className="text-lg text-red-600">There are no posts to display !</p>
      )}
      {!filter && <Pagination totalPage={totalPage} currentPage={Number(router.query.page)} />}
      <div
        className={`hidden p-3 z-50 overflow-scroll md:block sm:block ssm:block fixed h-[100vh] w-[35vw] top-0 right-0 bg-white transition duration-200 ease-in-out md:w-[40vw] sm:w-[50vw] ssm:w-[50vw] transform ${
          !isShowTagMobile ? 'translate-x-full' : ''
        }`}
      >
        <TagSectionobile />
      </div>
    </div>
  );
}

PostsPage.Layout = MainLayout;

export default PostsPage;
