/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';

import useSWR from 'swr';

import New from '../../Components/New';
import TagSectionMobile from '../../Components/TagContent/TagSectionMobile';
import { MainLayout } from '../../layout';

function NewsPage({ news }: { news: any }) {
  const [isShowTagMobile, setIsShowTagMobile] = useState(false);

  const { data: allNews } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/news/full-list`, {
    revalidateOnMount: true,
    // revalidateOnMount: true,
    revalidateIfStale: true,
    fallbackData: news.data,
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
        'ssm:-translate-x-full',
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
      {allNews?.data?.map((_new: any) => (
        <New _new={_new} />
      ))}
      <TagSectionMobile isShowTagMobile={isShowTagMobile} />
    </div>
  );
}
NewsPage.Layout = MainLayout;

export default NewsPage;

export const getStaticProps = async () => {
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/full-list`);
  const news = await res1.json();

  return {
    props: {
      news,
    },
    revalidate: 1,
  };
};
