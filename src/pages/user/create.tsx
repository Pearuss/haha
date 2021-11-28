/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

import ModalPost from '../../common/CreatePost';
import { HeaderLayout } from '../../layout';

interface INewPost {
  title: string;
  content: string;
  tag: string[];
  category: string;
  public: boolean;
}

function UserCreatePage() {
  const { data: tagData }: any = useSWR('http://localhost:3001/tags', { revalidateOnFocus: false });
  const { data: catData }: any = useSWR('http://localhost:3001/category', {
    revalidateOnFocus: false,
  });

  const [newPost, setNewPost] = useState<INewPost>({
    title: '',
    content: '',
    tag: [],
    category: catData?.[0]?.name,
    public: true,
  });

  const handleUpload = () => {
    const tagCheckbox: NodeList | any = document.querySelectorAll('.tagcheckbox');

    tagCheckbox.forEach((tagItem: HTMLInputElement) => {
      tagItem.checked = false;
    });

    setNewPost({
      title: '',
      content: '',
      tag: [],
      category: catData[0].name,
      public: true,
    });
  };

  useEffect(() => {
    setNewPost({
      title: '',
      content: '',
      tag: [],
      category: catData?.[0]?.name,
      public: true,
    });
  }, [catData]);

  // Select tags
  useEffect(() => {
    const tagE: HTMLElement | any = document.querySelector('.tag');
    const tagSelect: HTMLElement | any = document.querySelector('.tagselect');
    const tagCheckbox: NodeList | any = document.querySelectorAll('.tagcheckbox');
    tagE.style.display = 'none';

    tagSelect.addEventListener('click', () => {
      if (tagE.style.display === 'none') {
        tagE.style.display = 'flex';
      } else {
        tagE.style.display = 'none';
      }
    });

    tagCheckbox.forEach((tagItem: HTMLInputElement) => {
      tagItem.addEventListener('click', () => {
        if (tagItem.checked) {
          setNewPost((state) => {
            const newTag = state.tag.slice();
            newTag.push(tagItem.name);

            return {
              ...state,
              tag: newTag,
            };
          });
        } else {
          setNewPost((state) => {
            const newTag: string[] = state.tag.slice();
            const index: number = newTag.indexOf(tagItem.name);

            newTag.splice(index, 1);

            return {
              ...state,
              tag: newTag,
            };
          });
        }
      });
    });
  }, []);

  // Select category
  useEffect(() => {
    const categoryE: HTMLElement | any = document.querySelector('.category');

    categoryE.addEventListener('change', () => {
      setNewPost((state) => ({ ...state, category: categoryE.value }));
    });
  }, []);

  return (
    <div className="mx-auto mt-3 w-full">
      {/* <p className="leading-8 text-gray-600 font-medium text-base">Home / Create Post</p> */}
      <ModalPost
        newPost={newPost}
        setNewPost={setNewPost}
        catData={catData}
        handleUpload={handleUpload}
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
