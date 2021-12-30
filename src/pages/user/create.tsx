/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';

import useSWR from 'swr';

import ModalPost from '../../Components/CreatePost';
import { HeaderLayout } from '../../layout';

interface INewPost {
  title: string;
  shortContent: string;
  content: string;
  status: true;
  reason: string;
  sectionNo: number;
  partialId: number;
  tag: string[];
  mainCategory: string;
  relatedCategory: string[];
  image: string;
  public: boolean;
}

function UserCreatePage() {
  const { data: tagData }: any = useSWR('http://localhost:3100/api/v1/tags', {
    revalidateOnFocus: false,
  });
  const { data: catData }: any = useSWR('http://localhost:3100/api/v1/category/get-full', {
    revalidateOnFocus: false,
  });

  const [newPost, setNewPost] = useState<INewPost>({
    title: '',
    shortContent: '',
    content: '',
    status: true,
    reason: '',
    sectionNo: 1,
    partialId: 0,
    tag: [],
    mainCategory: '',
    relatedCategory: [],
    image: '',
    public: true,
  });

  useEffect(() => {
    try {
      const button = document.createElement('button');

      button.className = 'btnUpLoadMD';
      button.innerHTML = `
      <svg
        className="block MuiSvgIcon-root MuiSvgIcon-fontSizeMedium  css-w2bhrx"
        focusable="false"
        viewBox="0 0 24 24"
        width="20" height="20"
        aria-hidden="true"
        data-testid="ImageSearchIcon"
        aria-label="fontSize medium"
      >
        <path fill="currentColor" d="M18 13v7H4V6h5.02c.05-.71.22-1.38.48-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5l-2-2zm-1.5 5h-11l2.75-3.53 1.96 2.36 2.75-3.54zm2.8-9.11c.44-.7.7-1.51.7-2.39C20 4.01 17.99 2 15.5 2S11 4.01 11 6.5s2.01 4.5 4.49 4.5c.88 0 1.7-.26 2.39-.7L21 13.42 22.42 12 19.3 8.89zM15.5 9C14.12 9 13 7.88 13 6.5S14.12 4 15.5 4 18 5.12 18 6.5 16.88 9 15.5 9z"></path>
      </svg>
  `;

      setTimeout(() => {
        const md = document.querySelectorAll('.md-editor .md-editor-toolbar');

        md[1]?.appendChild(button);
        const btnUpLoadMD: any = document.querySelector('.btnUpLoadMD');
        btnUpLoadMD.onclick = openBrowseImg;
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Append link image inside markdown
  function handleUploadImgMD(e: any) {
    console.log(e.target.files[0]);

    setNewPost((state: any) => ({
      ...state,
      content: `${state.content}![](https://media.geeksforgeeks.org/wp-content/uploads/20190702142251/Screenshot-4051.png)`,
    }));
  }

  function openBrowseImg(e: any) {
    e.preventDefault();
    document.getElementById('uploadImgMD')?.click();
  }

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

  const changePartialId = (value: any) => {
    setNewPost((state: any) => ({ ...state, partialId: value.value }));
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
    console.log(1);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setNewPost((state: any) => ({ ...state, image: reader.result }));
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const removeImage = () => {
    setNewPost((state: any) => ({ ...state, image: '' }));
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
        changePartialId={changePartialId}
        changeTag={changeTag}
        changeStatus={changeStatus}
        changePublic={changePublic}
        catData={catData?.data}
        imageHandler={imageHandler}
        removeImage={removeImage}
        tagData={tagData?.data}
      />
      <input
        type="file"
        name="uploadImgMD"
        id="uploadImgMD"
        className="hidden"
        onChange={handleUploadImgMD}
      />
    </div>
  );
}

UserCreatePage.Layout = HeaderLayout;

export default UserCreatePage;
