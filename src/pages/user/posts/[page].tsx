/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { FilterMyPosts } from '../../../common/FilterMyPosts';
import Post from '../../../common/Post';
import { MyPostLayout } from '../../../layout';
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
        {!filter && <Pagination totalPage={totalPage} currentPage={Number(router.query.page)} />}
      </div>
    </div>
  );
}

PostsPage.Layout = MyPostLayout;

export default PostsPage;
