import React, { ReactElement, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import TagSectionMobile from '../../common/TagContent/TagSectionMobile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import PostDetail from '../../common/PostDetail';
import { ContentIndex } from '../../common/ContentIndex';
import { DetailPostLayout } from '../../layout';
import { useAuth } from '../../hooks';

import CommentSection from '../../common/CommentSection/CommentSection';

function Index({ data }: any): ReactElement {
  const [isLogin, setIsLogin] = useState(false);
  const [showFormComment, setShowFormComment] = useState(false);
  const [isShowContentIndex, setIsShowContentIndex] = useState(true);
  const [isReadMore, setIsReadMore] = useState(true);
  const [isShowTopicMobile, setIsShowTopicMobile] = useState(false);
  const [isShowTagMobile, setIsShowTagMobile] = useState(false);

  const { profile, firstLoading } = useAuth();
  const router = useRouter();

  const postId = router.query.id;

  if (router.isFallback) {
    return <div style={{ fontSize: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  useEffect(() => {
    const btnCloseTopic: any = document.querySelector('.btnCloseTopic');

    btnCloseTopic?.addEventListener('click', () => {
      setIsShowTopicMobile(!isShowTopicMobile);
    });
  }, [isShowTopicMobile]);

  useEffect(() => {
    if (!firstLoading && !profile?.username) {
      setIsLogin(false);
    } else if (profile?.username) {
      setIsLogin(true);
    }
  }, [profile, firstLoading]);

  useEffect(() => {
    try {
      const contentIndexE: any = document.querySelector('.contentIndex');
      const headingE: any = document.getElementsByTagName('h1');

      let html = '';
      for (let i = 0; i < headingE.length; i++) {
        headingE[i].id = `${i + 1}-h-id`;
        html += `<li><a class="headingContent cursor-pointer">${i + 1}. ${
          headingE[i].innerHTML
        }</a></li>`;
      }

      if (html === '') {
        setIsShowContentIndex(false);
      }

      contentIndexE.innerHTML = contentIndexE == null ? '' : html;
    } catch (error) {}
  }, [isReadMore]);

  useEffect(() => {
    const focusHeading: any = document.querySelectorAll(`.headingContent`);
    const headingE: any = document.getElementsByTagName('h1');

    for (let i = 0; i < focusHeading.length; i++) {
      focusHeading[i].addEventListener('click', () => {
        headingE[i].scrollIntoView();

        window.scroll(0, headingE[i].offsetTop + 130);
      });
    }

    window.addEventListener('scroll', () => {
      let current = 0;

      for (let i = 0; i < headingE.length; i++) {
        const headingTop = headingE[i].offsetTop;

        if (pageYOffset >= headingTop) {
          current = i + 1;
        }
      }

      for (let i = 0; i < focusHeading.length; i++) {
        if (i + 1 === current) {
          focusHeading[i].classList.add('heading-active');
        } else {
          focusHeading[i].classList.remove('heading-active');
        }
      }
    });
  }, [isReadMore]);

  useEffect(() => {
    const coverTag = document.querySelector('.cover');
    coverTag?.addEventListener('click', () => {
      setIsShowTagMobile(false);
    });
  }, []);

  const toggleFormComment = () => {
    setShowFormComment(!showFormComment);
  };

  const showTopicMobile = () => {
    setIsShowTopicMobile(!isShowTopicMobile);
  };

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
    <div className="relative flex md:mr-0 sm:mr-0">
      {isShowContentIndex && (
        <div className="mr-4 sm:mr-8 ssm:mr-12">
          <div
            className={`topicSsm w-[10vw] ssm:w-[40vw] ssm:topicSsm ssm:z-50 ssm:bg-white transition duration-200 ease-in-out ssm:fixed ssm:left-0 ssm:top-0 ${
              isShowTopicMobile
                ? 'ssm:translate-x-0 top-0 '
                : 'md:hidden sm:hidden ssm:-translate-x-full top-0'
            }`}
          >
            <ContentIndex />
          </div>
          {isShowTopicMobile ? (
            <div
              onClick={showTopicMobile}
              className="btnOption fixed top-[8rem] hidden z-40 w-max max-h-8 px-1 border-2 border-gray-500 hover:bg-gray-400 md:block sm:block ssm:block"
            >
              <CloseIcon />
            </div>
          ) : (
            <div
              onClick={showTopicMobile}
              className="btnOption fixed top-[8rem] hidden z-40 w-max max-h-8 px-1 border-2 border-gray-500 hover:bg-gray-400 md:block sm:block ssm:block"
            >
              <MoreVertIcon />
            </div>
          )}
        </div>
      )}
      <div
        className={`${
          isShowContentIndex == false ? 'flex-1 ml-[3vw] mr-[3vw]' : ''
        } w-full mr-[2vw] pl-2 md:w-[100%] md:mx-[3vw] md:pl-0`}
      >
        <p className="leading-8 mb-4 text-gray-600 font-medium text-base">Home / Post</p>
        <PostDetail dataPostDetail={data} isReadMore={isReadMore} setIsReadMore={setIsReadMore} />
        {isLogin && (
          <div className="flex items-center justify-between py-4 mt-12 shadow-sm font-medium text-gray-700 rounded-md bg-white mb-4">
            <div className="text-lg">Comments (20)</div>
            <button
              onClick={toggleFormComment}
              className="flex items-center py-[0.35rem] px-3 rounded-md border border-blue-600 text-blue-600"
            >
              <Image src="/images/pencil2.png" width={20} height={20} />
              <span className="ml-1">Add comment</span>
            </button>
          </div>
        )}
        {isLogin && (
          <CommentSection
            postId={postId}
            showForm={showFormComment}
            setShowFormComment={setShowFormComment}
          />
        )}
      </div>

      {/* {isLogin &&
        data.allComments?.map((comment: any) => (
          <CommentSection key={comment.id} comment={comment} />
        ))} */}
      <div
        className={`w-full transition duration-200 ease-in-out 3xl:max-w-[34vw] 2xl:max-w-[32vw] xl:max-w-[30vw] md:w-[35vw] md:h-[100vh] md:fixed md:top-0 md:right-0 md:z-50 md:bg-white md:px-3 md:border-gray-300 md:shadow-lg md:border-l md:overflow-scroll sm:w-[45vw] sm:h-[100vh] sm:fixed sm:top-0 sm:right-0 sm:z-50 sm:bg-white sm:px-3 sm:border-gray-300 sm:shadow-lg sm:border-l sm:overflow-scroll ssm:w-[50vw] ssm:h-[100vh] ssm:fixed ssm:top-0 ssm:right-0 ssm:z-50 ssm:bg-white ssm:px-3 ssm:border-gray-300 ssm:shadow-lg ssm:border-l ssm:overflow-scroll ${
          isShowTagMobile ? '' : 'md:translate-x-full sm:translate-x-full ssm:translate-x-full'
        }`}
      >
        <TagSectionMobile />
      </div>
      {/* cover */}
      <div className="coverTag hidden fixed z-50 top-0 left-0 w-[100vw] h-[100vh] bg-gray-600 bg-opacity-30"></div>
    </div>
  );
}
Index.Layout = DetailPostLayout;

export default Index;

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3001/posts?_limit=5');
  const posts = await res.json();

  const paths = posts?.data?.map((post: any) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context: any) => {
  const { id } = context?.params;
  if (!id) return { notFound: true };
  const res = await fetch(`http://localhost:3001/posts/${id}?_limit=5`);
  const posts = await res.json();

  return {
    props: {
      data: posts,
    },
    revalidate: 5,
  };
};
