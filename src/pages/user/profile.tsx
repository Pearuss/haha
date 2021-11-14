import React from 'react';

import Image from 'next/image';

import Post from '../../common/Post';
import UserDetail from '../../common/ProfileInfomation/UserDetail';
import { useAuth } from '../../hooks';
import { AdminLayout } from '../../layout';

interface PostItem {
  id: string;
  title: string;
  img: string;
  body: string;
}

function ProfilePage({ data }: any) {
  const { profile } = useAuth();
  return (
    <div className="relative flex items-center flex-col w-full h-100vh pt-4 pr-8">
      <div className="relative max-w-full w-full h-[220px] max-h-[220px]">
        <Image src="/images/cover-photo4.jpg" layout="fill" objectFit="cover" />
        <div className="absolute w-[138px] h-[138px] bottom-[-66px] left-4 overflow-hidden rounded-full border-[6px] border-white">
          <Image
            src="/images/toc2.jpg"
            width={132}
            height={132}
            objectFit="cover"
            className="  z-10"
            priority
            placeholder="blur"
          />
        </div>
      </div>
      <UserDetail data={profile} />
      {data?.map((post: PostItem) => (
        <Post key={post.id} post={post} />
      ))}
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
