/* eslint-disable */
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import Post from '../../Components/Post';
import TagSectionMobile from '../../Components/TagContent/TagSection';
import useToggle from '../../hooks/use-toggle';
import { MainLayout } from '../../layout';
import useSWR from 'swr';
import { Tag } from '../../models';
import useFetch from '../../hooks/use-fetch';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

function PostsTag({ data, currentTag }: any) {
  const router = useRouter();
  const [isFollow, setIsFollow] = useToggle(false);
  const [isShowTagMobile, setIsShowTagMobile] = useState(false);
  const [totalFollow, setTotalFollow] = useState<number | null>(0);
  const tagId = currentTag.id;

  const { data: followTags } = useSWR('/api/v1/following-tag/get-full');

  const followHandler = async () => {
    if (currentTag.id && isFollow) {
      const res = await useFetch('/api/v1/following-tag/unfollow', {
        method: 'POST',
        body: JSON.stringify({
          tagId: currentTag.id,
        }),
      });
      res.message.toString() === '200' ? setIsFollow(false) : null;
    }
    if (currentTag.id && !isFollow) {
      const res = await useFetch('/api/v1/following-tag/follow', {
        method: 'POST',
        body: JSON.stringify({
          tagId: currentTag.id,
        }),
      });
      res.message.toString() === '200' ? setIsFollow(true) : null;
    }
  };

  useEffect(() => {
    if (followTags?.errCd) return;
    let currentTagIndex = -1;
    currentTagIndex = followTags?.data?.findIndex((tag: Tag) => tag.id === tagId);
    if (currentTagIndex === -1) {
      setIsFollow(false);
    } else {
      setIsFollow(true);
    }
  }, [router, followTags]);

  useEffect(() => {
    const getTotalFollow = async () => {
      const res = await useFetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/following-tag/total-follower/${currentTag.id}`
      );
      if (res?.message.toString() === '200') {
        setTotalFollow(res.data);
      }
    };
    if (currentTag.id) {
      getTotalFollow();
    }
  }, [tagId, followTags, isFollow]);

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
      <NextSeo
        title={currentTag.name}
        // defaultTitle={`All articles in ${currentTag.name} tag`}
        description="Hybrid Technologies Know-How"
        // keywords={currentTag.name}
      />
      <div className="flex items-center ">
        <Image
          loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/hashtag1.png`}
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/hashtag1.png`}
          alt="Hash tag"
          width={40}
          height={40}
        />
        <p className="text-5xl 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-[40px] sm:text-[40px] ssm:text-3xl text-black font-normal ml-[1vw]">
          Tag: {currentTag?.name || ''}
        </p>
      </div>
      {!followTags?.errCd && (
        <div className="flex w-full my-4 ml-3">
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
      )}
      {data.map((post: any) => (
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
  const tags = await useFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tags`);

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

  const fullTags = await useFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tags`);

  const tagResult = fullTags.data.find((item: any) => item.slug === `/${tag}`);
  if (!tagResult) return { notFound: true };

  const res = await useFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/article/tag/${tagResult?.id}`
  );
  const { data }: any = res;

  return {
    props: {
      data,
      currentTag: tagResult,
    },
    revalidate: 1,
  };
};
