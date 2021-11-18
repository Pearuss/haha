import React, { ReactElement, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

// import InputMention from '../../common/InputMention/InputMention';
import Image from 'next/image';
import PostDetail from '../../common/PostDetail';
import { DetailPostLayout } from '../../layout';
import { useAuth } from '../../hooks';

import CommentSection from '../../common/CommentSection/CommentSection';

function Index({ data }: any): ReactElement {
  const [isLogin, setIsLogin] = useState(false);
  const [showFormComment, setShowFormComment] = useState(false);

  const { profile, firstLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!firstLoading && !profile?.username) {
      setIsLogin(false);
    } else if (profile?.username) {
      setIsLogin(true);
    }
  }, [profile, firstLoading]);

  // console.log(profile);

  if (router.isFallback) {
    return <div style={{ fontSize: '2rem', textAlign: 'center' }}>Loading...</div>;
  }
  useEffect(() => {
    const contentIndexE: any = document.querySelector('.contentIndex');
    const headingE: any = document.getElementsByTagName('h1');

    let html = '';
    for (let i = 0; i < headingE.length; i++) {
      headingE[i].id = `${i + 1}-h-id`;
      html += `<li><a class="headingContent cursor-pointer">${i + 1}. ${
        headingE[i].innerHTML
      }</a></li>`;
    }

    contentIndexE.innerHTML = html;

    const focusHeading: any = document.querySelectorAll(`.headingContent`);
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
  });
  return (
    <div className="mr-16">
      <p className="text-4xl pb-6 text-blue-500">Create diagrams online realtime collaboration!</p>
      <PostDetail dataPostDetail={data} />

      {isLogin && (
        <div className="flex items-center justify-between py-4 px-4 shadow-sm font-medium text-gray-700 rounded-md bg-white mb-4">
          <div className="text-lg">Comments (20)</div>
          <button
            onClick={() => setShowFormComment(true)}
            className="flex items-center py-[0.35rem] px-3 rounded-md border border-blue-600 text-blue-600"
          >
            <Image src="/images/pencil2.png" width={20} height={20} />
            <span className="ml-1">Add comment</span>
          </button>
        </div>
      )}
      {isLogin && <CommentSection showForm={showFormComment} />}

      {/* {isLogin &&
        data.allComments?.map((comment: any) => (
          <CommentSection key={comment.id} comment={comment} />
        ))} */}
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
