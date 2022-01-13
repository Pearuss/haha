import React, { useEffect, useState } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import UserDetail from '../../common/ProfileInfomation/UserDetail';
import Post from '../../Components/Post';
// import { useAuth } from '../../hooks';
import TagSectionMobile from '../../Components/TagContent/TagSectionMobile';
import useCall from '../../hooks/use-call';
import { AdminLayout } from '../../layout';
import { Article } from '../../models';

function ProfilePage() {
  // const { profile } = useAuth();
  const router = useRouter();
  const userId = router.query.userId as never;
  const { value: profile }: any = useCall(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/${userId}`,
    {},
    [userId],
  );
  const [profileImage, setProfileImage] = useState(
    profile?.data?.thumbnail || `${process.env.NEXT_PUBLIC_IMAGE_URL}/articles/user.png`,
  );
  const thumbnail = profile?.data.thumbnail;

  useEffect(() => {
    if (thumbnail) {
      setProfileImage(
        `${process.env.NEXT_PUBLIC_IMAGE_URL}${thumbnail}`
          || `${process.env.NEXT_PUBLIC_IMAGE_URL}/articles/user.png`,
      );
    }
  }, [thumbnail]);

  const { value: articles }: { value: Article[] | any } = useCall(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/article/${userId}`,
    {},
    [userId],
  );

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
        <Link href="/user/profile">
          <p className="leading-8 cursor-pointer">Profile</p>
        </Link>
      </div>
      <div className="relative max-w-full w-full h-[220px] max-h-[220px]">
        <Image src="/images/cover-photo4.jpg" layout="fill" objectFit="cover" />
        <div className="absolute w-[138px] h-[138px] bottom-[-66px] left-4 overflow-hidden rounded-full border-[6px] border-white z-40">
          <Image
            loader={() => profileImage}
            src={profileImage}
            // src="/images/user.png"
            width={132}
            height={132}
            objectFit="cover"
            // className=" object-cover bg-black "
            priority
          />
        </div>
      </div>
      <UserDetail data={profile} userId={userId} />
      {articles?.data
        .slice(0)
        .reverse()
        .map((article: any) => (
          <Post key={article.id} article={article} />
        ))}
      <TagSectionMobile isShowTagMobile={isShowTagMobile} />
    </div>
  );
}

ProfilePage.Layout = AdminLayout;
export default ProfilePage;
