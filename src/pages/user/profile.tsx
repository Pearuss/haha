import React, { useEffect, useState } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import Link from 'next/link';

import UserDetail from '../../common/ProfileInfomation/UserDetail';
import Post from '../../Components/Post';
// import { useAuth } from '../../hooks';
import TagSectionMobile from '../../Components/TagContent/TagSectionMobile';
import useCall from '../../hooks/use-call';
import { AdminLayout } from '../../layout';
import { Article } from '../../models';

function ProfilePage() {
  // const { profile } = useAuth();
  const { value: articles }: { value: Article[] | any } = useCall(
    '/api/v1/user/article/my-articles',
    {},
    [],
  );
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
    <div className="relative mr-16 bg-white md:mr-0 sm:mr-0 ssm:mx-auto ssm:px-[2vw]">
      <div className="flex items-center text-gray-600 text-sm">
        <Link href="/">
          <p className="leading-8 cursor-pointer">Home</p>
        </Link>
        <ArrowForwardIosIcon className="px-2" />
        <Link href="/user/profile">
          <p className="leading-8 cursor-pointer">Profile</p>
        </Link>
      </div>
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
      <UserDetail />
      {articles
        ?.slice(0)
        .reverse()
        .map((article: Article) => (
          <Post key={article.id} article={article} />
        ))}
      <TagSectionMobile isShowTagMobile={isShowTagMobile} />
    </div>
  );
}

ProfilePage.Layout = AdminLayout;
export default ProfilePage;

// export const getStaticProps = async () => {
//   const res = await fetch('http://localhost:3001/posts');
//   const posts = await res.json();

//   return {
//     props: {
//       data: posts.map((post: any) => ({
//         id: post.id,
//         title: post.title,
//         body: post.body,
//         views: post.views,
//         comments: post.comments,
//         tags: post.tags,
//         img: post.img,
//         author: post.author,
//       })),
//     },
//     revalidate: 1,
//   };
// };
