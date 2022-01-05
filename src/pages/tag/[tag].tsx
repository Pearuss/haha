/* eslint-disable */
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import Post from '../../Components/Post';
import TagSectionMobile from '../../Components/TagContent/TagSection';
import useToggle from '../../hooks/use-toggle';
import { MainLayout } from '../../layout';
import { capitalizeFirstLetter } from '../../utilities/helper';

function PostsTag(data: any) {
  const [isFollow, setIsFollow] = useToggle(false);
  const [isShowTagMobile, setIsShowTagMobile] = useState(false);
  const router = useRouter();

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
    <div className="mr-16 md:mr-0 sm:mr-0 ssm:mx-auto ssm:px-[2vw]">
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
      {data.post?.map((post: any) => (
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

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3001/posts?_limit=300');
  const posts = await res.json();

  const paths = posts?.data?.map((post: any) => ({
    params: { tag: post.id.toString() },
  }));
  return {
    paths,
    // paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: true,
  };
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3001/posts');
  const post = await res.json();

  return {
    props: { post },
    revalidate: 1,
  };
}
