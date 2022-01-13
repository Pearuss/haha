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

function PostDetail({ dataPostDetail, isReadMore, setIsReadMore }: any) {
  const { profile, firstLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [isLiked, setIsLiked] = useState<any>();
  const [isInWork, setIsInWork] = useState<any>();
  // const [totalLiked, setTotalLiked] = useState<any>(0);
  const router = useRouter();
  const article = dataPostDetail.data;

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

  const contentBody =
    isReadMore && !isLogin
      ? truncateBody(`${article.content}`, 580).toString() // max content length is 580
      : truncateBody(`${article.content}`, 20000).toString(); // see full content

  useEffect(() => {
    if (!firstLoading && !profile?.data && !localStorage.getItem('tokenSso')) {
      setIsLogin(false);
      setIsReadMore(true);
    } else if (profile?.data || localStorage.getItem('tokenSso')) {
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
      useFetch('http://localhost:9500/api/v1/user/articleinwork/uninwork', {
        method: 'POST',
        body: JSON.stringify({ articleId: article.id }),
      });
      setIsInWork(false);
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md px-4 pt-2 py-16 mb-8 text-gray-600  h-auto postDetail flex-1 max-w-[70vw]">
      <div className=" text-black font-semibold text-3xl sm:text-2xl ssm:text-xl pl-2 py-4 mx-auto ">
        {article?.title}
      </div>
      <div className="flex items-center pl-2">
        <Image
          src="/images/toc2.jpg"
          width={48}
          height={48}
          objectFit="cover"
          className="rounded-full"
          priority
        />
        <span className="font-medium text-xl ml-2 text-blueCyanLogo">
          {`${article.author.firstName} ${article.author.lastName}`}
        </span>
        <span className="text-gray-500 text-sm ml-1 mt-1">
          @{`${article.mainCategory.name}• ${timeAgo(new Date(article?.publishedAt))}`}
        </span>
        {profile?.data?.userId === article?.authorId && (
          <Link href={`/posts/edit/${article.id}`}>
            <span className="mt-1 ml-2">
              <Image src="/images/pencil.png" width={12} height={12} />
            </span>
          </Link>
        )}
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
          <div
            className={`flex items-center gap-2 px-[6px] py-[3px] cursor-pointer border border-white ${
              isInWork ? ' border-blueCyanLogo rounded hover:bg-blueCyanLight' : ''
            }`}
            onClick={InWorkHandler}
          >
            <Image src="/images/target.png" width={20} height={20} />
            <span>{totalInWorkRes?.data || 0}</span>
          </div>
          <div
            className={`flex items-center gap-2 px-[6px] py-[3px] cursor-pointer border border-white ${
              isLiked ? ' border-blueCyanLogo rounded hover:bg-blueCyanLight' : ''
            }`}
            onClick={likedHandler}
          >
            <Image src="/images/heart.png" width={20} height={20} />
            <span>{totalLikedRes?.data || 0}</span>
          </div>
          <div className="flex items-center gap-2 px-[6px] py-[3px] cursor-pointer border border-white">
            <Image src="/images/comment.png" width={20} height={20} />
            <span>{dataPostDetail.comments}</span>
          </div>
          <div className="flex items-center gap-2 px-[6px] py-[3px] cursor-pointer border border-white">
            <Image src="/images/view.png" width={20} height={20} />
            <span>{article?.viewCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}
// PostDetail.Layout = MainLayout;
export default PostDetail;
