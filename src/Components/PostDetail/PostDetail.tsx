/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

import { useAuth } from '../../hooks';
import { truncateBody, timeAgo } from '../../utilities/helper';
import CodeBlock from './CodeBlock';

function PostDetail({ dataPostDetail, isReadMore, setIsReadMore }: any) {
  const { profile, firstLoading } = useAuth();
  // const [isViewer, setIsViewer] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const article = dataPostDetail.data;
  console.log('article', article);

  // useEffect(() => {
  //   if (localStorage.getItem('isView') && localStorage.getItem('isView') === 'true') {
  //     setIsViewer(true);
  //   } else {
  //     setIsViewer(false);
  //   }
  // }, []);

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

  return (
    <div className="relative bg-white rounded-lg shadow-md px-4 pt-2 py-16 mb-8 text-gray-600  h-auto">
      <div className="w-full text-black font-semibold text-3xl sm:text-2xl ssm:text-xl pl-2 py-4 mx-auto">
        {dataPostDetail.title}
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
          @{`${article.mainCategory.name}· ${timeAgo(new Date(article?.publishedAt))}`}
        </span>
        <Link href={`/posts/edit/${article.id}`}>
          <span className="mt-1 ml-2">
            <Image src="/images/pencil.png" width={12} height={12} />
          </span>
        </Link>
      </div>

      <div className="postContent mx-2 mb-4 mt-5 h-auto">
        <ReactMarkdown components={CodeBlock} children={contentBody} />
      </div>
      {dataPostDetail?.content?.length > 580 && (
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
      <div className="flex items-center justify-evenly absolute bottom-[4%] mt - left-0 right-0 text-blueCyanLogo">
        <div className="flex items-center gap-2">
          <Image src="/images/target.png" width={20} height={20} />
          <span>{dataPostDetail.inWorks}</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/images/heart.png" width={20} height={20} />
          <span>{dataPostDetail.likes}</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/images/comment.png" width={20} height={20} />
          <span>{dataPostDetail.comments}</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/images/view.png" width={20} height={20} />
          <span>{dataPostDetail.views}</span>
        </div>
      </div>
    </div>
  );
}
// PostDetail.Layout = MainLayout;
export default PostDetail;
