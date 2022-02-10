import React, { useEffect, useState } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import UserDetail from '../../common/ProfileInfomation/UserDetail';
import Post from '../../Components/Post';
import TagSectionMobile from '../../Components/TagContent/TagSectionMobile';
import useFetch from '../../hooks/use-fetch';
import { MainLayout } from '../../layout';

function ProfilePage() {
  const router = useRouter();
  const userId = router.query.userId as never;
  const [profileClient, setProfileClient] = useState<any>();
  const [allArticleUser, setAllArticleUser] = useState<any>();

  const [profileImage, setProfileImage] = useState(
    `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/articles/user.png`,
  );
  const [coverImage, setCoverImage] = useState(
    `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/cover-photo4.jpg`,
  );
  const thumbnail = profileClient?.thumbnail;
  const coverUrl = profileClient?.cover;

  useEffect(() => {
    const getProfile = async () => {
      const dataUser = await useFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${userId}`);
      if (dataUser.message === 200) {
        setProfileClient(dataUser.data);
      } else {
        Swal.fire('Something went wrong whet get profile, please try again later!');
        router.replace('/');
      }
    };
    const getAllArticleUser = async () => {
      const dataArticles = await useFetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/article/${userId}`,
      );
      if (dataArticles.message === 200) {
        setAllArticleUser(dataArticles);
      } else {
        Swal.fire('Something went wrong whet get articles, please try again later!');
        router.replace('/');
      }
    };
    if (userId) {
      getProfile();
      getAllArticleUser();
    }
  }, [userId]);

  useEffect(() => {
    if (thumbnail) {
      setProfileImage(`${process.env.NEXT_PUBLIC_IMAGE_URL}${thumbnail}`);
    }
    if (coverUrl) {
      setCoverImage(`${process.env.NEXT_PUBLIC_IMAGE_URL}${coverUrl}`);
    }
  }, [profileClient]);

  const [isShowTagMobile, setIsShowTagMobile] = useState(false);

  useEffect(() => {
    const btnShowTag = document.querySelector('.btnShowTag');
    const menuMobile: HTMLElement | null = document.querySelector('.menuMobile');
    const cover: HTMLElement | null = document.querySelector('.cover');

    btnShowTag?.addEventListener('click', () => {
      setIsShowTagMobile(true);
      menuMobile?.classList.add(
        'md:-translate-x-full',
        'sm:-translate-x-full',
        'ssm:-translate-x-full',
      );
      menuMobile?.classList.remove('md:translate-x-0', 'sm:translate-x-0', 'ssm:translate-x-0');
    });

    cover?.addEventListener('click', () => {
      cover?.classList.add('hidden');
      setIsShowTagMobile(false);
    });
  }, []);

  return (
    <div className="relative mr-16 bg-white md:mr-0 sm:mr-0 ssm:mx-auto ssm:px-[2vw] flex-1 mt-[-10px]">
      <div className="flex items-center text-gray-600 text-sm ">
        <Link href="/">
          <p className="leading-8 cursor-pointer">Home</p>
        </Link>
        <ArrowForwardIosIcon className="px-2" />
        <Link href={`/user/${userId}`}>
          <p className="leading-8 cursor-pointer">Profile</p>
        </Link>
      </div>
      <div className="relative max-w-full w-full h-[220px] max-h-[220px]">
        <Image
          loader={() => coverImage}
          src={coverImage}
          onError={() => {
            setCoverImage(
              `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/cover-photo4.jpg`,
            );
          }}
          alt="Cover image"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute w-[138px] h-[138px] bottom-[-66px] left-4 overflow-hidden rounded-full border-[6px] border-white z-40">
          <Image
            loader={() => profileImage}
            src={profileImage}
            alt="Avatar"
            onError={() => {
              setCoverImage(`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/articles/user.png`);
            }}
            width={132}
            height={132}
            objectFit="cover"
            priority
          />
        </div>
      </div>
      <UserDetail data={profileClient} userId={userId} />
      {allArticleUser?.data
        .slice(0)
        .reverse()
        .map((article: any) => (
          <Post key={article.id} article={article} />
        ))}
      <TagSectionMobile isShowTagMobile={isShowTagMobile} />
    </div>
  );
}

ProfilePage.Layout = MainLayout;
export default ProfilePage;
