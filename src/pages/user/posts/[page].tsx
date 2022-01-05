/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import useSWR from 'swr';

// import { FilterMyPosts } from '../../../Components/FilterMyPosts';
// import Pagination from '../../../Components/Pagination';
import Post from '../../../Components/Post';
import TagSectionMobile from '../../../Components/TagContent/TagSectionMobile';
import useCall from '../../../hooks/use-call';
import { MainLayout } from '../../../layout';
import { Article } from '../../../models';

function PostsPage() {
  const router = useRouter();

  const [isShowTagMobile, setIsShowTagMobile] = useState(false);

  // const page = router.query.page as never;

  const { value: articles }: { value: Article[] | any } = useCall(
    '/api/v1/user/article/my-articles',
    {},
    [],
  );

  // const { data }: any = useSWR(`http://localhost:3001/posts?_page=${router.query.page}&_limit=5`, {
  //   revalidateOnFocus: false,
  // });

  // const { data: dataAll }: any = useSWR('http://localhost:3001/posts', {
  //   revalidateOnFocus: false,
  // });

  // const [dataPosts, setDataPosts] = useState<PostItem[]>([]);

  // const [filter, setFilter] = useState(false);
  // const totalPage = Math.ceil(Number(data?.pagination._totalRow) / 5);
  // const currentPage = Number(router.query.page);

  // useEffect(() => {
  //   setDataPosts(data?.data);
  // }, [data]);

  useEffect(() => {
    if (Number(router.query.page) < 1) {
      router.push('/user/posts/1');
    }
  }, [router.query.page]);

  useEffect(() => {
    const btnShowTag = document.querySelector('.btnShowTag');
    const menuMobile: HTMLElement | null = document.querySelector('.menuMobile');
    const cover: HTMLElement | null = document.querySelector('.cover');

    btnShowTag?.addEventListener('click', () => {
      setIsShowTagMobile(true);
      menuMobile?.classList.add(
        'md:-translate-x-full',
        'sm:-translate-x-full',
        'ssm:-translate-x-full',
      );
      menuMobile?.classList.remove('md:translate-x-0', 'sm:translate-x-0', 'ssm:translate-x-0');
    });

    cover?.addEventListener('click', () => {
      cover?.classList.add('hidden');
      setIsShowTagMobile(false);
    });
  }, []);

  // const onClickNoFilter = () => {
  //   setDataPosts(dataAll);
  // };

  // const onClickFilter = (tagName: any) => {
  //   setDataPosts(dataAll?.filter((post: any) => post.tags === tagName));
  // };

  // const goOtherPage = (page: number) => {
  //   router.push(`/user/posts/${page}`);
  // };

  // const goNextPage = () => {
  //   if (currentPage < totalPage) {
  //     router.push(`/user/posts/${currentPage + 1}`);
  //   }
  // };

  // const goPrevPage = () => {
  //   if (currentPage > 1) {
  //     router.push(`/user/posts/${currentPage - 1}`);
  //   }
  // };

  return (
    <div className="mr-16 md:mr-0 sm:mr-0 ssm:mx-auto ssm:px-[2vw] flex-1">
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
        {/* <div className="mt-0 md:hidden sm:hidden ssm:hidden">
          <FilterMyPosts
            onClickNoFilter={onClickNoFilter}
            onClickFilter={onClickFilter}
            setFilter={setFilter}
          />
        </div> */}
        <h1 className="text-4xl font-medium mb-6">{`${articles?.data[0]?.author?.firstName}'s Posts`}</h1>
      </div>
      {articles?.data.map((article: Article) => (
        <Post key={article.id} article={article} />
      ))}

      {/* {dataPosts?.length > 0 ? (
      //   dataPosts?.map((post: PostItem) => <Post key={post.id} post={post} />)
      // ) : (
      //   <p className="text-lg text-red-600">There are no posts to display !</p>
      // )}
      // {!filter && (
      //   <Pagination
      //     totalPage={totalPage}
      //     currentPage={Number(router.query.page)}
      //     goOtherPage={goOtherPage}
      //     goNextPage={goNextPage}
      //     goPrevPage={goPrevPage}
      //   />
      // )} */}
      <TagSectionMobile isShowTagMobile={isShowTagMobile} />
    </div>
  );
}

PostsPage.Layout = MainLayout;

export default PostsPage;

// export const getStaticPaths = async () => {
//   const res = await fetch('http://localhost:3000/api/v1/user/article/my-articles');
//   const articles = await res.json();

//   // console.log(articles);

//   const paths = articles?.data?.map((article: any) => ({
//     params: { page: article.id.toString() },
//   }));
//   // const paths = {
//   //   params: { page: "2" },
//   // };

//   return {
//     paths,
//     fallback: 'blocking',
//   };
// };

// export const getStaticProps = async (context: any) => {
//   const { page } = context?.params;
//   console.log(page);

//   // if (!page) return { notFound: true };
//   // const res = await fetch(`http://localhost:3100/api/v1/user/article/${page}/detail`);
//   // const articles = await res.json();

//   return {
//     props: {
//       articles: [],
//       // articles: articles.data,
//     },
//   };
// };
