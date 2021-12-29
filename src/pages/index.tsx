/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';

// import Link from 'next/link';
import Link from 'next/link';

import Post from '../Components/Post';
import TagSectionMobile from '../Components/TagContent/TagSectionMobile';
import { MainLayout } from '../layout';
import { truncate } from '../utilities/helper';

// import { LayoutMeta } from 'next';

// interface PostItem {
//   id: string;
//   title: string;
//   img: string;
//   body: string;
// }

function HomePage({ articles, news }: any) {
  const [isShowTagMobile, setIsShowTagMobile] = useState(false);

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

  return (
    <div className="mr-16 md:mr-0 sm:mr-0 ssm:mx-auto ssm:px-[2vw]">
      <div className="relative w-full h-44 bg-white p-4 pt-0 rounded-md shadow-sm ssm:h-auto ssm:min-h-[250px] sm:min-h-[210px]">
        <Link href={`/posts/${news[0]?.id}`}>
          <div className="text-[44px] 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-[30px] sm:text-[28px] ssm:text-2xl pb-6 text-black font-normal cursor-pointer mt-[-9px]">
            {news[0]?.title}
          </div>
        </Link>
        <div className="text-sm">{truncate(`${news[0]?.body}`, 220)}</div>

        <div className="absolute bottom-1 right-4 pb-2 text-xs">
          <span>
            {news[0]?.tags}
            {' '}
            -
            {news[0]?.mainCatId}
          </span>
          <span className="ml-3">|</span>
          <span className="ml-3">12 Feb 2020 </span>
        </div>
      </div>
      <div className="mt-4 text-gray-900">
        <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 ssm:grid-cols-1 sm:h-[10.5rem] xl:h-[10.5rem] h-40 gap-10 pt-4 mb-10 ssm:mx-auto">
          <div className="relative w-full h-full bg-white p-4 rounded-md shadow-md cursor-pointer hover:transform hover:shadow-custom hover:scale-105 transition-all duration-300 ">
            <Link href={`/posts/${news[1]?.id}`}>
              <div className="font-medium pb-1 text-black">{news[1]?.title}</div>
            </Link>
            <div className="text-sm">{truncate(`${news[1]?.body}`, 50)}</div>

            <div className="absolute bottom-1 right-4 pb-2 text-xs">
              <span>
                {news[1]?.tags}
                {' '}
                -
                {news[1]?.author}
              </span>
              <span className="ml-3">|</span>
              <span className="ml-3">12 Feb 2020 </span>
            </div>
          </div>
          <div className="relative w-full h-full bg-white p-4 rounded-md shadow-md cursor-pointer hover:transform hover:shadow-custom hover:scale-105 transition-all duration-300  ssm:hidden">
            <Link href={`/posts/${news[2]?.id}`}>
              <div className="font-medium pb-1 text-black">{truncate(`${news[2]?.title}`, 40)}</div>
            </Link>
            <div className="text-sm">{truncate(`${news[2]?.body}`, 50)}</div>

            <div className="absolute bottom-1 right-4 text-gray-700 pb-2 text-xs">
              <span>
                {news[2]?.tags}
                {' '}
                -
                {news[2]?.author}
              </span>
              <span className="ml-3">|</span>
              <span className="ml-3">12 Feb 2020 </span>
            </div>
          </div>
          <div className="relative w-full h-full bg-white p-4 rounded-md shadow-md cursor-pointer hover:transform hover:shadow-custom hover:scale-105 transition-all duration-300  lg:hidden md:hidden xl:hidden sm:hidden ssm:hidden">
            <Link href={`/posts/${news[3]?.id}`}>
              <div className="font-medium pb-1 text-black">{truncate(`${news[3]?.title}`, 40)}</div>
            </Link>
            <div className="text-sm">{truncate(`${news[3]?.body}`, 50)}</div>

            <div className="absolute bottom-1 right-4 text-gray-700 pb-2 text-xs">
              <span>
                {news[3]?.tags}
                {' '}
                -
                {news[3]?.author}
              </span>
              <span className="ml-3">|</span>
              <span className="ml-3">12 Feb 2020 </span>
            </div>
          </div>
        </div>
      </div>
      {articles.map((article: any) => (
        <Post key={article.id} article={article} />
      ))}
      <TagSectionMobile isShowTagMobile={isShowTagMobile} />
    </div>
  );
}
HomePage.Layout = MainLayout;

export default HomePage;

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3100/api/v1/user/article/full-list');
  const articles = await res.json();

  const res1 = await fetch('http://localhost:3001/posts');
  const news = await res1.json();

  return {
    props: {
      articles: articles.data,
      news,
    },
  };
};
