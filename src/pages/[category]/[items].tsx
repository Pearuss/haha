/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Post from '../../Components/Post';
import TagSectionMobile from '../../Components/TagContent/TagSection';
import { MainLayout } from '../../layout';
import { capitalizeFirstLetter } from '../../utilities/helper';

function Category({ data }: any) {
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
    <div className="flex-1 mr-16 md:mr-0 sm:mr-0 ssm:mx-auto ssm:px-[2vw]">
      <div className="flex items-center mb-4">
        <Image
          loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/category.png`}
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/category.png`}
          width={40}
          height={40}
        />
        <p className="text-5xl 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-[40px] sm:text-[40px] ssm:text-3xl pb-1 text-black font-normal ml-[1vw]">
          Category:{' '}
          <Link href={`/${router.query.category}`}>
            <span className="hover:hover:opacity-70 cursor-pointer">
              {capitalizeFirstLetter(router.query.category?.toString() || '')}
            </span>
          </Link>{' '}
          /{' '}
          <Link href="">
            <span className="hover:hover:opacity-70  cursor-pointer">
              {capitalizeFirstLetter(router.query.items?.toString() || '')}
            </span>
          </Link>
        </p>
      </div>

      {data?.map((post: any) => (
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tags`);
  const tags = await res.json();

  const paths = tags.data.map((tag: any) => ({
    params: { items: tag.slug?.toString(), category: '1' },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { items, category } = params;
  if (!items) return { notFound: true };

  const resFullCat = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/menu`);
  const fullCats = await resFullCat.json();
  // const catResult = fullCats.data.find(
  //   (item: any) => item.name.toLowerCase() === category.toLowerCase(),
  // );
  const catResult = fullCats.data.find((item: any) => item.slug === `/${category}/${items}`);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/article/cat/${catResult?.id}`);
  const { data }: any = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 1,
  };
};
