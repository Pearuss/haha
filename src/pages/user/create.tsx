/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import useSWR from 'swr';

import ModalPost from '../../Components/CreatePost';
import { HeaderLayout } from '../../layout';

interface INewPost {
  title: string;
  shortContent: string;
  content: string;
  status: true;
  reason: string;
  sectionNo: any;
  partialId: any;
  tag: string[];
  mainCategory: string;
  relatedCategory: string[];
  image: any[];
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
    partialId: '',
    tag: [],
    mainCategory: '',
    relatedCategory: [],
    image: [],
    public: true,
  });
  console.log(newPost);

  const changeTitle = (e: any) => {
    setNewPost((state: any) => ({ ...state, title: e.target.value }));
  };

  const changeShortContent = (e: any) => {
    setNewPost((state: any) => ({ ...state, shortContent: e.target.value }));
  };

  const changeSectionNo = (value: any) => {
    setNewPost((state: any) => ({ ...state, sectionNo: +value.value }));
  };

  const changeMainCategory = (value: any) => {
    setNewPost((state: any) => ({ ...state, mainCategory: value.value }));
  };

  const changeRelatedCategory = (value: any) => {
    const newrelCat = value.map((cat: any) => cat.value);
    setNewPost((state: any) => ({ ...state, relatedCategory: newrelCat }));
  };

  const changeTag = (value: any) => {
    const newTag = value.map((tag: any) => tag.value);
    setNewPost((state: any) => ({ ...state, tag: newTag }));
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

  const imageHandler = (e: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        let newImg = [...newPost.image];
        newImg.push(reader.result);
        setNewPost((state: any) => ({ ...state, image: newImg }));
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const removeImage = (index: number) => {
    let newImg = [...newPost.image];
    newImg.splice(index, 1);
    setNewPost((state: any) => ({ ...state, image: newImg }));
  };

  return (
    <div className="mx-auto mt-3 h-2/3 w-full">
      <ModalPost
        newPost={newPost}
        setNewPost={setNewPost}
        changeTitle={changeTitle}
        changeShortContent={changeShortContent}
        changeSectionNo={changeSectionNo}
        changeMainCategory={changeMainCategory}
        changeRelatedCategory={changeRelatedCategory}
        changeTag={changeTag}
        changeStatus={changeStatus}
        changePublic={changePublic}
        catData={catData}
        imageHandler={imageHandler}
        removeImage={removeImage}
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
