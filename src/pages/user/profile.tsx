import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import Post from '../../common/Post';
import UserDetail from '../../common/ProfileInfomation/UserDetail';
import { useAuth } from '../../hooks';
import { AdminLayout } from '../../layout';
import TagSectionobile from '../../common/TagContent/TagSectionMobile';

interface PostItem {
  id: string;
  title: string;
  img: string;
  body: string;
}

function ProfilePage({ data }: any) {
  const { profile } = useAuth();

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
        'ssm:-translate-x-full'
      );
      menuMobile.classList.remove('md:translate-x-0', 'sm:translate-x-0', 'ssm:translate-x-0');
    });

    cover.addEventListener('click', () => {
      cover.classList.add('hidden');
      setIsShowTagMobile(false);
    });
  }, []);

  console.log(profile);

  return (
    <div className="relative mr-16 bg-white md:mr-0 sm:mr-0 ssm:mx-auto ssm:px-[2vw]">
      <div className="relative max-w-full w-full h-[220px] max-h-[220px]">
        <Image src="/images/cover-photo4.jpg" layout="fill" objectFit="cover" />
        <div className="absolute w-[138px] h-[138px] bottom-[-66px] left-4 overflow-hidden rounded-full border-[6px] border-white">
          <Image
            src="/images/toc2.jpg"
            width={132}
            height={132}
            objectFit="cover"
            className="z-10"
            priority
          />
        </div>
      </div>
      <UserDetail data={profile} />
      {data?.map((post: PostItem) => (
        <Post key={post.id} post={post} />
      ))}
      <div
        className={`hidden p-3 z-50 overflow-scroll md:block sm:block ssm:block fixed h-[100vh] w-[35vw] top-0 right-0 bg-white transition duration-200 ease-in-out md:w-[40vw] sm:w-[50vw] ssm:w-[50vw] transform ${
          !isShowTagMobile ? 'translate-x-full' : ''
        }`}
      >
        <TagSectionobile />
      </div>
    </div>
  );
}

ProfilePage.Layout = AdminLayout;
export default ProfilePage;

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3001/posts');
  const posts = await res.json();

  return {
    props: {
      data: posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        body: post.body,
        views: post.views,
        comments: post.comments,
        tags: post.tags,
        author: post.author,
      })),
    },
    revalidate: 5,
  };
};
