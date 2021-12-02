/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import useSWR from 'swr';

import ModalPost from '../../common/CreatePost';
import { HeaderLayout } from '../../layout';

interface INewPost {
  title: string;
  shortContent: string;
  content: string;
  status: true;
  reason: string;
  sectionNo: any;
  tag: string[];
  mainCategory: string;
  relatedCategory: string[];
  public: boolean;
}

function UserCreatePage() {
  const { data: tagData }: any = useSWR('http://localhost:3001/tags', { revalidateOnFocus: false });
  const { data: catData }: any = useSWR('http://localhost:3001/category', {
    revalidateOnFocus: false,
  });

  const [newPost, setNewPost] = useState<INewPost>({
    title: '',
    shortContent: '',
    content: '',
    status: true,
    reason: '',
    sectionNo: 1,
    tag: [],
    mainCategory: '',
    relatedCategory: [],
    public: true,
  });

  const handleSubmit = () => {
    console.log('newPost: ', newPost);
  };

  const changeStatus = () => {
    setNewPost((state: any) => ({ ...state, status: !newPost.status }));
  };

  const changePublic = () => {
    setNewPost((state: any) => ({
      ...state,
      public: !state.public,
    }));
  };

  return (
    <div className="mx-auto mt-3 h-2/3 w-full">
      <ModalPost
        newPost={newPost}
        setNewPost={setNewPost}
        changeStatus={changeStatus}
        changePublic={changePublic}
        catData={catData}
        handleSubmit={handleSubmit}
        tagData={tagData?.followingTags}
      />
    </div>
  );
}

UserCreatePage.Layout = HeaderLayout;

export default UserCreatePage;

export const getStaticProps = async () => {
  const resTag = await fetch('http://localhost:3001/tags');
  const tags = await resTag.json();
  const tagData = tags.followingTags;

  const resCat = await fetch('http://localhost:3001/category');
  const catData = await resCat.json();

  return {
    props: {
      tagData,
      catData,
    },
  };
};
