/* eslint-disable */
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import Post from '../../Components/Post';
import TagSectionMobile from '../../Components/TagContent/TagSection';
import useToggle from '../../hooks/use-toggle';
import { MainLayout } from '../../layout';
import { capitalizeFirstLetter } from '../../utilities/helper';
import useSWR from 'swr';
import { Tag } from '../../models';

function PostsTag({ data }: any) {
  console.log('data', data);

  const [isFollow, setIsFollow] = useToggle(false);
  const [isShowTagMobile, setIsShowTagMobile] = useState(false);
  const router = useRouter();

  const { data: followTags } = useSWR('/api/v1/following-tag/get-full', {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    followTags?.data.some((tag: Tag) => tag.slug == `/${router.query.tag}`)
      ? setIsFollow(true)
      : setIsFollow(false);
  }, [router, followTags]);

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
    <div className="flex-1 mr-16 md:mr-0 sm:mr-0 ssm:mx-auto ssm:px-[2vw]">
      <div className="flex items-center ">
        <Image src="/images/hashtag1.png" width={40} height={40} />
        <p className="text-5xl 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-[40px] sm:text-[40px] ssm:text-3xl text-black font-normal ml-[1vw]">
          Tag: {capitalizeFirstLetter(router.query.tag?.toString() || '')}
        </p>
      </div>
      <div className="flex w-full my-4">
        <button
          onClick={setIsFollow}
          className={`px-3 py-2 rounded-lg font-medium tracking-wider  cursor-pointer border border-blueCyanLogo ${
            isFollow ? 'border-gray-400 text-gray-900' : 'bg-blueCyanLogo text-white px-6'
          }`}
        >
          {isFollow ? 'UnFollow' : 'Follow'}
        </button>
        <span className="px-3 py-2 font-medium text-gray-900 ">100 Follower</span>
      </div>
      <div className="w-full flex items-center pt-8 border-b-4 border-blueCyanLogo">
        <div className="flex-1 pb-2 text-center font-semibold  text-blueCyanLogo">All Posts</div>
      </div>
      {data
        ?.slice(0)
        .reverse()
        .map((post: any) => (
          <Post key={post.id} article={post} />
        ))}
      <div
        className={`hidden p-3 z-50 overflow-scroll md:block sm:block ssm:block fixed h-[100vh] w-[35vw] top-0 right-0 bg-white transition duration-200 ease-in-out md:w-[40vw] sm:w-[50vw] ssm:w-[70vw] transform ${
          !isShowTagMobile ? 'translate-x-full' : ''
        }`}
      >
        <TagSectionMobile />
      </div>
    </div>
  );
}
PostsTag.Layout = MainLayout;
export default PostsTag;

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3100/api/v1/tags');
  const tags = await res.json();

  const paths = tags.data.map((tag: any) => {
    return {
      params: { tag: tag.slug?.toString() },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { tag } = params;
  if (!tag) return { notFound: true };

  const resFullTags = await fetch('http://localhost:3100/api/v1/tags');
  const fullTags = await resFullTags.json();

  const tagResult = fullTags.data.find((item: any) => item.slug === `/${tag}`);

  const res = await fetch(`http://localhost:3100/api/v1/user/article/tag/${tagResult?.id}`);
  const { data }: any = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 1,
  };
};
