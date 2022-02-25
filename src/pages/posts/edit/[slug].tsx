/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';

import { useRouter } from 'next/router';
import useSWR from 'swr';

import { Loading } from '../../../common/Loading';
import ModalPost from '../../../Components/CreatePost/ModalEditPost';
import useCall from '../../../hooks/use-call';
import useFetch from '../../../hooks/use-fetch';
import { HeaderLayout } from '../../../layout';
import { INewPost } from '../../../models';

function UserCreatePage({ data }: any) {
  const router = useRouter();
  const refEdit = useRef(false);

  useEffect(() => {
    const confirmationMessage = 'Changes you made may not be saved.';
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      if (!refEdit.current) return;
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;
    };
    const beforeRouteHandler = (url: string) => {
      if (!refEdit.current) return;
      if (router.pathname !== url && !confirm(confirmationMessage)) {
        router.events.emit('routeChangeError');
        throw `Route change to "${url}"`;
      }
    };
    window.addEventListener('beforeunload', beforeUnloadHandler);
    router.events.on('routeChangeStart', beforeRouteHandler);

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      router.events.off('routeChangeStart', beforeRouteHandler);
    };
  }, []);

  const oldArticle = data.data[0];

  const { data: tagData }: any = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/tags`, {
    revalidateOnFocus: false,
  });
  const { data: catData }: any = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/category/menu`, {
    revalidateOnFocus: false,
  });
  const { value: myArticle }: any = useCall('/api/v1/user/article/my-articles', {}, []);

  const [newPost, setNewPost] = useState<INewPost>({
    title: oldArticle?.title,
    shortContent: oldArticle?.short_content,
    content: oldArticle?.content,
    status: oldArticle?.status,
    reason: '',
    sectionNo: oldArticle?.section_no,
    partialId: oldArticle?.partial_id,
    tag: oldArticle?.articleTags?.split(',').map((item: string) => parseInt(item, 10)) || [],
    mainCategory: oldArticle?.main_cat_id,
    relatedCategory:
      oldArticle?.articleCategories?.split(',').map((item: string) => parseInt(item, 10)) || [],
    image: `${process.env.NEXT_PUBLIC_IMAGE_URL}${oldArticle?.thumbnail}`,
    public: true,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        const btnUpLoadMD: HTMLElement | null = document.querySelector('.btnUpLoadMD');
        if (btnUpLoadMD) btnUpLoadMD.onclick = openBrowseImg;
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setEdited = (value: boolean) => {
    refEdit.current = value;
  };

  // Append link image inside markdown
  function handleUploadImgMD(e: ChangeEvent<HTMLInputElement> | any): void {
    const reader = new FileReader();
    let path: string;
    reader.onload = async () => {
      if (reader.readyState === 2) {
        path = await useFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/image/upload`, {
          method: 'POST',
          body: JSON.stringify({
            image: reader.result,
          }),
        });
      }
      setNewPost((state: any) => ({
        ...state,
        content: `${state.content}![](${process.env.NEXT_PUBLIC_IMAGE_URL}${path})`,
      }));
      setEdited(true);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  function openBrowseImg(e: ChangeEvent<MouseEvent> | any): void {
    e.preventDefault();
    document.getElementById('uploadImgMD')?.click();
  }

  const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewPost((state: INewPost) => ({ ...state, title: e.target.value }));
    setEdited(true);
  };

  const changeShortContent = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewPost((state: INewPost) => ({ ...state, shortContent: e.target.value }));
    setEdited(true);
  };

  const changeSectionNo = (value: any): void => {
    setNewPost((state: INewPost) => ({ ...state, sectionNo: +value.value }));
    setEdited(true);
  };

  const changeMainCategory = (value: any): void => {
    setNewPost((state: INewPost) => ({ ...state, mainCategory: value.value }));
    setEdited(true);
  };

  const changeRelatedCategory = (value: any): void => {
    const newrelCat = value.map((cat: any) => cat.value);
    setNewPost((state: INewPost) => ({ ...state, relatedCategory: newrelCat }));
    setEdited(true);
  };

  const changePartialId = (value: any): void => {
    if (value === null) setNewPost((state: INewPost) => ({ ...state, partialId: 0 }));
    else setNewPost((state: INewPost) => ({ ...state, partialId: value.value }));
    setEdited(true);
  };

  const changeTag = (value: any): void => {
    const newTag = value.map((tag: any) => tag.value);
    setNewPost((state: INewPost) => ({ ...state, tag: newTag }));
    setEdited(true);
  };

  const changeStatus = (): void => {
    setNewPost((state: INewPost) => ({ ...state, status: !newPost.status }));
    setEdited(true);
  };

  const changePublic = (): void => {
    setNewPost((state: INewPost) => ({
      ...state,
      public: !state.public,
    }));
    setEdited(true);
  };

  const imageHandler = (e: any): void => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setNewPost((state: INewPost) => ({ ...state, image: `${reader.result}` }));
        setEdited(true);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const removeImage = (): void => {
    setNewPost((state: INewPost) => ({ ...state, image: '' }));
    setEdited(true);
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
        myArticle={myArticle?.data}
        imageHandler={imageHandler}
        removeImage={removeImage}
        setIsLoading={setIsLoading}
        tagData={tagData?.data}
        articleId={oldArticle?.id}
        setEdited={setEdited}
      />
      <input
        type="file"
        name="uploadImgMD"
        id="uploadImgMD"
        className="hidden"
        onChange={handleUploadImgMD}
      />
      {isLoading ? <Loading /> : ''}
    </div>
  );
}

UserCreatePage.Layout = HeaderLayout;

export default UserCreatePage;

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/article/full-list?limit=100`);
  const posts = await res.json();

  const paths = posts?.data?.map((post: any) => ({
    params: { slug: post.slug.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: any) => {
  const { slug } = context?.params;
  if (!slug) return { notFound: true };
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/article/${slug}/detail`);
  const data: any = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 1,
  };
};
