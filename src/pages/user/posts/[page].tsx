/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { FilterMyPosts } from '../../../common/FilterMyPosts';
import Post from '../../../common/Post';
import { MainLayout } from '../../../layout';
import Pagination from '../../../common/Pagination';

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

  const onClickNoFilter = () => {
    setDataPosts(dataAll);
  };

  const onClickFilter = (tagName: any) => {
    setDataPosts(dataAll?.filter((post: any) => post.tags === tagName));
  };

  return (
    <div className="mr-16">
      <div className="relative w-full">
        <p className="leading-8 text-gray-700 font-medium text-base">Home/My Post</p>
        <div className="mt-0">
          <FilterMyPosts
            onClickNoFilter={onClickNoFilter}
            onClickFilter={onClickFilter}
            setFilter={setFilter}
          />
        </div>
        <h1 className="mb-6">Thong's Posts</h1>
        {dataPosts?.length > 0 ? (
          dataPosts?.map((post: PostItem) => <Post key={post.id} post={post} />)
        ) : (
          <p className="text-lg text-red-600">There are no posts to display !</p>
        )}
        {!filter && <Pagination totalPage={totalPage} currentPage={Number(router.query.page)} />}
      </div>
    </div>
  );
}

PostsPage.Layout = MainLayout;

export default PostsPage;
