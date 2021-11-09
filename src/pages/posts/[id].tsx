import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';

import CommentSection from '../../common/CommentSection';
import InputMention from '../../common/InputMention/InputMention';
import PostDetail from '../../common/PostDetail';
import { MainLayout } from '../../layout';

function Index({ data }: any): ReactElement {
  const router = useRouter();
  if (router.isFallback) {
    return <div style={{ fontSize: '2rem', textAlign: 'center' }}>Loading...</div>;
  }
  return (
    <div className="mr-16">
      <p className="text-4xl pb-6 text-blue-500">Create diagrams online realtime collaboration!</p>
      <PostDetail dataPostDetail={data} />

      <div className="w-full relative mb-2">
        <InputMention />
      </div>

      {data.allComments?.map((comment: any) => (
        <CommentSection key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
Index.Layout = MainLayout;

export default Index;

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3001/posts?_limit=5');
  const posts = await res.json();

  const paths = posts.map((post: any) => ({
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
