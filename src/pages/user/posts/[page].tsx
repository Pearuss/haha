/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { FilterMyPosts } from '../../../Components/FilterMyPosts';
import Pagination from '../../../Components/Pagination';
import Post from '../../../Components/Post';
import TagSectionMobile from '../../../Components/TagContent/TagSectionMobile';
import { MainLayout } from '../../../layout';

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

  const { data: dataAll }: any = useSWR('http://localhost:3001/posts', {
    revalidateOnFocus: false,
  });

  const [dataPosts, setDataPosts] = useState<PostItem[]>([]);

  const [filter, setFilter] = useState(false);
  const totalPage = Math.ceil(Number(data?.pagination._totalRow) / 5);
  const currentPage = Number(router.query.page);

  useEffect(() => {
    setDataPosts(data?.data);
  }, [data]);

  useEffect(() => {
    if (Number(router.query.page) < 1) {
      router.push('/user/posts/1');
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
        'ssm:-translate-x-full',
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

  const goOtherPage = (page: number) => {
    router.push(`/user/posts/${page}`);
  };

  const goNextPage = () => {
    if (currentPage < totalPage) {
      router.push(`/user/posts/${currentPage + 1}`);
    }
  };

  const goPrevPage = () => {
    if (currentPage > 1) {
      router.push(`/user/posts/${currentPage - 1}`);
    }
  };

  return (
    <div className="mr-16 md:mr-0 sm:mr-0 ssm:mx-auto ssm:px-[2vw]">
      <div className="relative w-full">
        <div className="flex items-center text-gray-600 text-sm">
          <Link href="/">
            <p className="leading-8 cursor-pointer">Home</p>
          </Link>
          <ArrowForwardIosIcon className="px-2" />
          <Link href="/user/posts/1">
            <p className="leading-8 cursor-pointer">My Post</p>
          </Link>
        </div>
        <div className="mt-0 md:hidden sm:hidden ssm:hidden">
          <FilterMyPosts
            onClickNoFilter={onClickNoFilter}
            onClickFilter={onClickFilter}
            setFilter={setFilter}
          />
        </div>
        <h1 className="text-4xl font-medium mb-6">Thong's Posts</h1>
      </div>
      {dataPosts?.length > 0 ? (
        dataPosts?.map((post: PostItem) => <Post key={post.id} post={post} />)
      ) : (
        <p className="text-lg text-red-600">There are no posts to display !</p>
      )}
      {!filter && (
        <Pagination
          totalPage={totalPage}
          currentPage={Number(router.query.page)}
          goOtherPage={goOtherPage}
          goNextPage={goNextPage}
          goPrevPage={goPrevPage}
        />
      )}
      <TagSectionMobile isShowTagMobile={isShowTagMobile} />
    </div>
  );
}

PostsPage.Layout = MainLayout;

export default PostsPage;
