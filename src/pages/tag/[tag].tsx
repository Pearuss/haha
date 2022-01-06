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
import useFetch from '../../hooks/use-fetch';

function PostsTag(data: any) {
  const [isFollow, setIsFollow] = useToggle(false);
  const [isShowTagMobile, setIsShowTagMobile] = useState(false);
  const [currentTagId, setCurrentTagId] = useState<string | null>(null);
  const [totalFollow, setTotalFollow] = useState<number | null>(0);
  const router = useRouter();

  const { data: allTag } = useSWR('http://localhost:3100/api/v1/tags', {
    revalidateOnFocus: false,
  });

  const { data: followTags } = useSWR('/api/v1/following-tag/get-full');

  const followHandler = async () => {
    if (currentTagId && isFollow) {
      const res = await useFetch('/api/v1/following-tag/unfollow', {
        method: 'POST',
        body: JSON.stringify({
          tagId: currentTagId,
        }),
      });
      res.message.toString() === '200' ? setIsFollow(false) : null;
    }
    if (currentTagId && !isFollow) {
      const res = await useFetch('/api/v1/following-tag/follow', {
        method: 'POST',
        body: JSON.stringify({
          tagId: currentTagId,
        }),
      });
      res.message.toString() === '200' ? setIsFollow(true) : null;
    }
  };
  useEffect(() => {
    let currentTagIndex = -1;
    currentTagIndex = followTags?.data?.findIndex(
      (tag: Tag) => tag.slug.toString() === `/${router.query.tag}`
    );
    if (currentTagIndex === -1) {
      const currentTag = allTag?.data?.findIndex(
        (tag: Tag) => tag.slug.toString() === `/${router.query.tag}`
      );
      setCurrentTagId(allTag?.data[currentTag]?.id || null);
      setIsFollow(false);
    } else {
      setCurrentTagId(followTags?.data[currentTagIndex]?.id || null);
      setIsFollow(true);
    }
  }, [router, followTags]);

  useEffect(() => {
    const getTotalFollow = async () => {
      const res = await useFetch(
        `http://localhost:3100/api/v1/following-tag/total-follower/${currentTagId}`
      );
      if (res.message.toString() === '200') {
        console.log(res);

        setTotalFollow(res.data);
      }
    };
    if (currentTagId) {
      getTotalFollow();
    }
  }, [currentTagId, followTags, isFollow]);

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
    <div className="mr-16 md:mr-0 sm:mr-0 ssm:mx-auto ssm:px-[2vw] flex-1">
      <div className="flex items-center ">
        <Image src="/images/hashtag1.png" width={40} height={40} />
        <p className="text-5xl 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-[40px] sm:text-[40px] ssm:text-3xl text-black font-normal ml-[1vw]">
          Tag: {capitalizeFirstLetter(router.query.tag?.toString() || '')}
        </p>
      </div>
      <div className="flex w-full my-4">
        <button
          onClick={followHandler}
          className={`px-3 py-2 rounded-lg font-medium tracking-wider  cursor-pointer border border-blueCyanLogo ${
            isFollow ? 'border-gray-400 text-gray-900' : 'bg-blueCyanLogo text-white px-6'
          }`}
        >
          {isFollow ? 'UnFollow' : 'Follow'}
        </button>
        <span className="px-3 py-2 font-medium text-gray-900 ">{totalFollow} Follower</span>
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
