/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';

// import Link from 'next/link';
import Link from 'next/link';
import useSWR from 'swr';

import Post from '../Components/Post';
import TagSectionMobile from '../Components/TagContent/TagSectionMobile';
// import { useAuth } from '../hooks';
import { MainLayout } from '../layout';
import { formatDate, truncate } from '../utilities/helper';
// import { Article } from '../models';

function HomePage({ articles, news }: { articles: any; news: any }) {
  const [isShowTagMobile, setIsShowTagMobile] = useState(false);

  const { data: allArticles } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/article/full-list`,
    {
      revalidateOnMount: true,
      // revalidateOnMount: true,
      revalidateIfStale: true,
      fallbackData: articles,
    }
  );
  const { data: allNews } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/news/full-list`, {
    revalidateOnMount: true,
    // revalidateOnMount: true,
    revalidateIfStale: true,
    fallbackData: news,
  });

  useEffect(() => {
    const btnShowTag = document.querySelector('.btnShowTag');
    const menuMobile: HTMLElement | null = document.querySelector('.menuMobile');
    const cover: HTMLElement | null = document.querySelector('.cover');

    btnShowTag?.addEventListener('click', () => {
      setIsShowTagMobile(true);
      menuMobile?.classList.add(
        'md:-translate-x-full',
        'sm:-translate-x-full',
        'ssm:-translate-x-full'
      );
      menuMobile?.classList.remove('md:translate-x-0', 'sm:translate-x-0', 'ssm:translate-x-0');
    });

    cover?.addEventListener('click', () => {
      cover?.classList.add('hidden');
      setIsShowTagMobile(false);
    });
  }, []);

  return (
    <div className="mr-12 md:mr-0 sm:mr-0 ssm:mx-auto ssm:px-[2vw] flex-1">
      {allNews?.data[0]?.id && (
        <div className="relative w-full h-auto bg-white p-4 pt-0 rounded-md shadow-sm ssm:h-auto ssm:min-h-[250px] sm:min-h-[210px] border-r md:mb-4 lg:mb-4">
          <Link href={`/news/${allNews?.data[0]?.id}`}>
            <div className="text-[37px] 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-[30px] sm:text-[28px] ssm:text-2xl pb-3 text-black font-normal cursor-pointer mt-[-9px] hover:opacity-70">
              {allNews?.data[0]?.title}
            </div>
          </Link>
          <div className="mb-8">{truncate(`${allNews?.data[0]?.shortContent}`, 360)}</div>

          <div className="absolute text-sm bottom-1 right-4 pb-2">
            <span>Admin</span>
            <span className="ml-3">|</span>
            <span className="ml-3">{formatDate(new Date(allNews?.data[0]?.createdAt))}</span>
          </div>
        </div>
      )}
      <div className="mt-4 text-gray-900 md:hidden lg:hidden">
        <div
          className={`flex items-center sm:h-[10.5rem] xl:h-[10.5rem] h-40 gap-12 pt-4 mb-10 ssm:mx-auto ${
            allNews?.data[2]?.id ? '' : 'hidden'
          }`}
        >
          {allNews?.data[2]?.id && (
            <div className="relative w-full h-full min-h-[160px] 3xl:min-h-[140px] lg:min-h-[170px] bg-white p-4 pb-2 rounded-md shadow-sm cursor-pointer hover:transform hover:shadow-custom transition-all duration-300 border-r border-b ">
              <Link href={`/news/${allNews?.data[1]?.id}`}>
                <div className="font-medium pb-1 text-black">{truncate(`${allNews.data[1]?.title}`, 60)}</div>
              </Link>
              <div className="mb-2">{truncate(`${allNews?.data[1]?.shortContent}`, 112)}</div>

              <div className="absolute text-sm bottom-1 right-4">
                <span>Admin</span>
                <span className="ml-3">|</span>
                <span className="ml-3">{formatDate(new Date(allNews?.data[1]?.createdAt))}</span>
              </div>
            </div>
          )}
          {allNews?.data[2]?.id && (
            <div className="relative w-full h-full min-h-[160px] 3xl:min-h-[140px] lg:min-h-[170px] bg-white p-4 rounded-md shadow-sm cursor-pointer hover:transform hover:shadow-custom transition-all duration-300  ssm:hidden border-r border-b">
              <Link href={`/news/${allNews.data[2]?.id}`}>
                <div className="font-medium pb-1 text-black">
                  {truncate(`${allNews.data[2]?.title}`, 60)}
                </div>
              </Link>
              <div className="mb-2 xl:mb-4 lg:mb-5 md:mb-5">
                {truncate(`${allNews.data[2]?.shortContent}`, 112)}
              </div>

              <div className="absolute text-sm bottom-2 right-4 text-gray-700">
                <span>Admin</span>
                <span className="ml-3">|</span>
                <span className="ml-3">{formatDate(new Date(allNews.data[2]?.createdAt))}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {allArticles?.data?.map((article: any) => (
        <Post key={article.id} article={article} />
      ))}
      <TagSectionMobile isShowTagMobile={isShowTagMobile} />
    </div>
  );
}
HomePage.Layout = MainLayout;

export default HomePage;

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/article/full-list`);
  const articles = await res.json();

  const res1 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/full-list`);
  const news = await res1.json();

  return {
    props: {
      articles,
      news,
    },
    revalidate: 1,
  };
};
