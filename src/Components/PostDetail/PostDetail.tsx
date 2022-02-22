/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

import { useAuth } from '../../hooks';
import { truncateBody, timeAgo } from '../../utilities/helper';
import CodeBlock from './CodeBlock';
import useSWR from 'swr';
import useFetch from '../../hooks/use-fetch';
import { Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

function PostDetail({ dataPostDetail, isReadMore, setIsReadMore }: any) {
  const { profile, firstLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [isLiked, setIsLiked] = useState<any>();
  const [isInWork, setIsInWork] = useState<any>();
  // const [totalLiked, setTotalLiked] = useState<any>(0);
  const router = useRouter();
  const article = dataPostDetail.data[0];
  const tagArray = article?.articleTagNames?.split(',');
  const tagSlugArray = article?.articleTagSlugs?.split(',');

  const { data: totalLikedRes, mutate: mutateLike }: any = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/articlelike/total-like/${article.id}`,
    {
      revalidateOnFocus: true,
    }
  );
  const { data: totalInWorkRes, mutate: mutateInWork }: any = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/articleinwork/total-inwork/${article.id}`,
    {
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    const checkIsLiked = async () => {
      const res = await useFetch(`/api/v1/user/articlelike/isLiked/${article.id}`);
      if (res.message === 200) {
        setIsLiked(res.data);
      }
    };
    const checkIsInWork = async () => {
      const res = await useFetch(`/api/v1/user/articleinwork/isInworked/${article.id}`);
      if (res.message === 200) {
        setIsInWork(res.data);
      }
    };
    if (isLogin && article?.id) {
      checkIsInWork();
      checkIsLiked();
    }
  }, [isLogin]);

  const contentBody = isReadMore
    ? truncateBody(`${article.content}`, 580).toString() // max content length is 580
    : truncateBody(`${article.content}`, 20000).toString(); // see full content
  // const contentBody =
  //   isReadMore && !isLogin
  //     ? truncateBody(`${article.content}`, 580).toString() // max content length is 580
  //     : truncateBody(`${article.content}`, 20000).toString(); // see full content

  useEffect(() => {
    if (!firstLoading && !profile?.data) {
      setIsLogin(false);
      setIsReadMore(true);
    } else if (profile?.data) {
      setIsReadMore(false);
      setIsLogin(true);
    }
  }, [profile, firstLoading]);

  const ReadMoreHandler = useCallback(() => {
    if (isLogin) {
      setIsReadMore(false);
    } else {
      router.replace('/login');
    }
  }, [profile]);

  const likedHandler = async () => {
    if (!isLiked && article?.id) {
      mutateLike({ data: totalLikedRes.data + 1 }, false);
      useFetch('/api/v1/user/articlelike/like', {
        method: 'POST',
        body: JSON.stringify({ articleId: article.id }),
      });
      setIsLiked(true);
    }
    if (isLiked && article?.id) {
      mutateLike({ data: totalLikedRes.data - 1 }, false);
      useFetch('/api/v1/user/articlelike/unlike', {
        method: 'POST',
        body: JSON.stringify({ articleId: article.id }),
      });
      setIsLiked(false);
    }
  };
  const InWorkHandler = async () => {
    if (!isInWork && article?.id) {
      mutateInWork({ data: totalInWorkRes.data + 1 }, false);
      useFetch('/api/v1/user/articleinwork/inwork', {
        method: 'POST',
        body: JSON.stringify({ articleId: article.id }),
      });
      setIsInWork(true);
    }
    if (isInWork && article?.id) {
      mutateInWork({ data: totalInWorkRes.data - 1 }, false);
      useFetch('/api/v1/user/articleinwork/uninwork', {
        method: 'POST',
        body: JSON.stringify({ articleId: article.id }),
      });
      setIsInWork(false);
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md px-4 pt-2 py-16 mb-8 text-gray-600  h-auto postDetail flex-1 max-w-[70vw]">
      <div className=" text-black font-semibold text-3xl sm:text-2xl ssm:text-xl pl-2 py-4 mx-auto w-full ">
        {article?.title}
      </div>
      <div className="flex items-center pl-2">
        <Link href={`/user/${article?.author_id}`}>
          <Image
            loader={() =>
              `${process.env.NEXT_PUBLIC_IMAGE_URL}${
                article?.authorAvatar || '/uploads/articles/user.png'
              }`
            }
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${
              article?.authorAvatar || '/uploads/articles/user.png'
            }`}
            alt="Avatar"
            width={48}
            height={48}
            objectFit="cover"
            className="rounded-full cursor-pointer"
            priority
          />
        </Link>
        <Link href={`/user/${article?.author_id}`}>
          <span className="font-medium text-xl ml-2 text-blueCyanLogo cursor-pointer hover:opacity-50">
            {article.authorName
              ? `${article.authorName}`
              : `${article.authorFirstname} ${article.authorLastname}`}
          </span>
        </Link>
        <Link href={`/${article?.mainCategory.trim().toLowerCase().replace(/ /g, '-')}`}>
          <span className="text-gray-500 text-sm ml-1 mt-1 cursor-pointer hover:opacity-50">
            @{`${article.mainCategory} • ${timeAgo(new Date(article?.published_at))} • `}
          </span>
        </Link>
        <span className="flex items-center mt-[5px] text-gray-500 pl-2">
          <Tooltip disableFocusListener disableTouchListener title="Viewed">
            <VisibilityIcon className="text-[15px]" />
          </Tooltip>
          <span className="pl-1 text-[13px]">{article?.view_count}</span>
        </span>

        {profile?.data?.userId === article?.author_id && (
          <Link href={`/posts/edit/${article.slug}`}>
            <Tooltip disableFocusListener disableTouchListener title="Edit">
              <span className="mt-1 ml-2 cursor-pointer">
                <Image
                  loader={() =>
                    `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/pencil.png`
                  }
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/pencil.png`}
                  alt="Edit"
                  width={14}
                  height={15}
                />
              </span>
            </Tooltip>
          </Link>
        )}
      </div>
      <div className="flex items-center mt-4">
        {tagArray?.map((tag: any, index: number) => (
          <Link href={`/tag${tagSlugArray[index]}`} key={tag}>
            <span className="px-2 py-1 border border-blueCyanLogo ml-2 text-sm rounded-md hover:bg-blueCyanLogo cursor-pointer">
              #{tag}
            </span>
          </Link>
        ))}
      </div>

      <div className="postContent mx-2 mb-6 mt-5 h-auto">
        <ReactMarkdown components={CodeBlock} children={contentBody} />
      </div>
      {article?.content?.length > 580 && (
        <button
          onClick={ReadMoreHandler}
          type="button"
          className={`ml-2 font-medium font-serif text-lg text-black cursor-pointer ${
            isReadMore ? '' : 'hidden'
          } ${isLogin ? 'hidden' : ''}`}
        >
          See more
        </button>
      )}
      {isLogin && (
        <div className="flex items-center justify-evenly absolute bottom-[16px] mt-2 left-0 right-0 text-blueCyanLogo">
          <Tooltip disableFocusListener disableTouchListener title="InWork">
            <div
              className={`flex items-center gap-2 px-[6px] py-[3px] cursor-pointer border border-white ${
                isInWork ? ' border-blueCyanLogo rounded hover:bg-blueCyanLight' : ''
              }`}
              onClick={InWorkHandler}
            >
              <Image
                loader={() =>
                  `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/target.png`
                }
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/target.png`}
                alt="Inwork"
                width={20}
                height={20}
              />
              <span>{totalInWorkRes?.data || 0}</span>
            </div>
          </Tooltip>
          <Tooltip disableFocusListener disableTouchListener title="Like">
            <div
              className={`flex items-center gap-2 px-[6px] py-[3px] cursor-pointer border border-white ${
                isLiked ? ' border-blueCyanLogo rounded hover:bg-blueCyanLight' : ''
              }`}
              onClick={likedHandler}
            >
              <Image
                loader={() =>
                  `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/heart.png`
                }
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/heart.png`}
                alt="Heart"
                width={20}
                height={20}
              />
              <span>{totalLikedRes?.data || 0}</span>
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
// PostDetail.Layout = MainLayout;
export default PostDetail;
