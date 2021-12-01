import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

import Post from '../../common/Post';
import TagSectionMobile from '../../common/TagContent/TagSection';
import useToggle from '../../hooks/use-toggle';
import { MainLayout } from '../../layout';

const Category = ({ data }: any): ReactElement => {
    const [isShowTagMobile, setIsShowTagMobile] = useState(false);
  const [isFollow, setIsFollow] = useToggle(false);
  console.log(data);

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
  console.log(router.query);

  return (
    <div className="mr-16 md:mr-0 sm:mr-0 ssm:mx-auto ssm:px-[2vw]">
      <div className="flex items-center text-5xl 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-[40px] sm:text-[40px] ssm:text-3xl pb-6 text-black font-normal">
        {/* <TagIcon className="text-4xl" /> */}
        <p>
          Category: {router.query.category}/{router.query.items}
        </p>
      </div>
      <div className="flex w-full mb-8">
        {/* <span className="px-3 py-2 font-medium text-gray-900 ">100 Follower</span> */}
        <button
          onClick={setIsFollow}
          className={`px-3 py-2 rounded-lg font-medium tracking-wider  cursor-pointer border border-gray-400 ${isFollow ? 'border-gray-400 text-gray-900' : 'bg-blueLogo text-white'}`}
        >
          {isFollow ? 'UnFollow' : 'Follow'}
        </button>
        {/* <span className="px-3 py-2 rounded-lg font-medium tracking-wider text-gray-900 cursor-pointer border border-gray-400">
          UnFollow
        </span> */}
      </div>
      <div className="w-full flex items-center pt-8 border-b-4 border-blueCyanLogo">
        <div className="flex-1 pb-2 text-center font-semibold  text-blueCyanLogo">Posts</div>
        <div className="flex-1 pb-2 text-center font-semibold text-gray-800">Comments</div>
      </div>
      {data?.map((post: any) => (
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
Category.Layout = MainLayout;
export default Category;

// export async function getStaticPaths() {
//   const res = await fetch('http://localhost:3001/posts?_limit=5');
//   const posts = await res.json();

//   const paths = posts?.data?.map((post: any) => ({
//     params: { tag: post.id.toString() },
//   }));
//   return {
//     paths,
//     // paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
//     fallback: true,
//   };
// }
export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

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
