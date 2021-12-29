import React, { useEffect, useState } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import UserDetail from '../../common/ProfileInfomation/UserDetail';
import Post from '../../Components/Post';
// import { useAuth } from '../../hooks';
import TagSectionMobile from '../../Components/TagContent/TagSectionMobile';
import { AdminLayout } from '../../layout';

// interface PostItem {
//   id: string;
//   title: string;
//   img: string;
//   body: string;
// }

const fakeOnePost = {
  userId: 1,
  tags: 'ReactJS',
  author: 'Pearuss',
  authorInfo: [
    {
      id: 1,
      name: 'Pearuss',
      organization: 'Hybrid Technologies Viet Nam',
      department: 'Internal System',
      title: 'Developer',
      address: 'HAN',
      email: 'test@gmail.com',
    },
  ],
  likes: 100,
  inWorks: 5,
  comments: 35,
  views: 61,
  img: 'https://sadesign.vn/wp-content/uploads/2020/11/di-doc-bai-bien.jpg',
  id: 1,
  title: 'Sunt aut facere repellat provident occaecati 7',
  body: '# What is this issue?\nCreate a function that calculates the sum of two natural numbers\nCreate a function that calculates the sum of two natural numbers\nCreate a function that calculates the sum of two natural numbers\nCreate a function that calculates the sum of two natural numbers\nCreate a function that calculates the sum of two natural numbers\nCreate a function that calculates the sum of two natural numbers\n# Solutions\n```js\nconst sum = (a, b) => {\n     return a + b);\n}\nconsole.log(sum(5,6));\nconst sum = (a, b) => {\n     return a + b);\n}\nconsole.log(sum(5,6));\nconst sum = (a, b) => {\n     return a + b);\n}\nconsole.log(sum(5,6));\nconst sum = (a, b) => {\n     return a + b);\n}\nconsole.log(sum(5,6));\nconst sum = (a, b) => {\n     return a + b);\n}\nconsole.log(sum(5,6));\n```\n# Conclude\nSearch for resources to solve problems like stackoverflow, github,...Search for resources to solve problems like stackoverflow, github,...',
};

function ProfilePage() {
  // const { profile } = useAuth();
  const router = useRouter();
  const userId = router.query.userId as never;

  const [isShowTagMobile, setIsShowTagMobile] = useState(false);

  //   const [userProfile, setUserProfile] = useState();
  //   console.log(userProfile);

  //   useEffect(() => {
  //     if (router.query?.userId) {
  //       const { userId } = router.query;
  //       const { data } = useSWR(`http://localhost:3100/api/v1/user/${userId}`, {
  //         revalidateOnFocus: false,
  //       });
  //       setUserProfile(data);
  //     }
  //   }, []);

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
      <UserDetail userId={userId} />
      {/* {data?.map((post: PostItem) => (
        <Post key={post.id} post={post} />
      ))} */}
      <Post key={fakeOnePost.id} post={fakeOnePost} />
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
