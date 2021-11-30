import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

import Post from '../../common/Post';
import TagSectionMobile from '../../common/TagContent/TagSection';
import TagIcon from '@mui/icons-material/Tag';
import { MainLayout } from '../../layout';

interface PostItem {
  id: string;
  title: string;
  img: string;
  body: string;
}

const PostsTag = (data: any): ReactElement => {
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
      <div className="flex items-center text-5xl 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-[40px] sm:text-[40px] ssm:text-3xl pb-6 text-blue-500 font-normal">
        <TagIcon className="text-4xl" />
        <p>Tag: {router.query.tag}</p>
      </div>
      <div className="flex w-full mb-8">
        <span className="px-3 py-2 font-medium text-gray-900 ">100 Follower</span>
        <span className="px-3 py-2 rounded-lg font-medium tracking-wider bg-blueLogo text-white cursor-pointer border border-gray-400">
          Follow
        </span>
        {/* <span className="px-3 py-2 rounded-lg font-medium tracking-wider text-gray-900 cursor-pointer border border-gray-400">
          UnFollow
        </span> */}
      </div>
      {data.post?.map((post: any) => (
        <Post key={post.id} post={post} />
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
};
PostsTag.Layout = MainLayout;
export default PostsTag;

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3001/posts?_limit=5');
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

export async function getStaticProps({ params }: any) {
  const res = await fetch(`http://localhost:3001/posts`);
  const post = await res.json();

  return {
    props: { post },
    revalidate: 1,
  };
}
