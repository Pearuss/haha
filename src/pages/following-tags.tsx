/* eslint-disable */
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Post from '../Components/Post';
import TagSectionMobile from '../Components/TagContent/TagSectionMobile';
import { useAuth } from '../hooks';
import { UserLayout } from '../layout';

function FollowingTag() {
  const [isShowTagMobile, setIsShowTagMobile] = useState(false);
  const { profile, firstLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (!firstLoading && !profile?.data) {
      setIsLogin(false);
    } else if (profile?.data) {
      setIsLogin(true);
    }
  }, [profile, firstLoading]);

  let { data: allHighlightArticles } = useSWR(
    isLogin ? 'api/v1/user/article/following-tags' : null,
    {
      revalidateOnMount: true,
      // revalidateOnMount: true,
      revalidateIfStale: true,
    }
  );
  if (!allHighlightArticles) {
    allHighlightArticles = [];
  }

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
    <div className="mr-16 md:mr-0 sm:mr-0 ssm:mx-auto ssm:px-[2vw] flex-1 mt-[-10px]">
      {allHighlightArticles?.data?.map((post: any) => (
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
FollowingTag.Layout = UserLayout;
export default FollowingTag;
