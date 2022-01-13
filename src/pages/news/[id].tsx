/* eslint-disable */
import React, { useEffect, useState } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';

import NewsDetail from '../../Components/PostDetail/NewsDetail';
import TagSectionMobile from '../../Components/TagContent/TagSectionMobile';
// import { useAuth } from '../../hooks';
import { DetailPostLayout } from '../../layout';

function NewSection({ data }: any) {
  const [isShowTopicMobile, setIsShowTopicMobile] = useState(false);
  const [isShowTagMobile, setIsShowTagMobile] = useState(false);

  useEffect(() => {
    const btnCloseTopic: any = document.querySelector('.btnCloseTopic');

    btnCloseTopic?.addEventListener('click', () => {
      setIsShowTopicMobile(!isShowTopicMobile);
    });
  }, [isShowTopicMobile]);

  useEffect(() => {
    const coverTag = document.querySelector('.cover');
    coverTag?.addEventListener('click', () => {
      setIsShowTagMobile(false);
    });
  }, []);

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

  return (
    <div className="relative flex flex-1 md:mr-0 sm:mr-0">
      <div className={`flex-1 w-full ml-[2vw] mr-[2vw] pl-2 md:w-[100%] md:mx-[3vw] md:pl-0`}>
        <div className="flex items-center text-gray-600 text-sm mt-[-12px]">
          <Link href="/">
            <p className="leading-8 cursor-pointer">Home</p>
          </Link>
          <ArrowForwardIosIcon className="px-2" />
          <Link href="#">
            <p className="leading-8 cursor-pointer">All news</p>
          </Link>
        </div>
        <NewsDetail dataPostDetail={data} />
      </div>
      <TagSectionMobile isShowTagMobile={isShowTagMobile} />
      {/* cover */}
      <div className="coverTag hidden fixed z-50 top-0 left-0 w-[100vw] h-[100vh] bg-gray-600 bg-opacity-30" />
    </div>
  );
}
NewSection.Layout = DetailPostLayout;

export default NewSection;

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/full-list`);
  const news = await res.json();

  const paths = news?.data?.map((post: any) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: any) => {
  const { id } = context?.params;
  if (!id) return { notFound: true };
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/${id}/detail`);
  const data: any = await res.json();

  return {
    props: {
      data: data,
    },
    revalidate: 1,
  };
};
