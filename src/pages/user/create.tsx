/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';

import ModalPost from '../../common/ModalPost';
import { HeaderLayout } from '../../layout';

interface INewPost {
  title: string;
  content: string;
  tag: string[];
  category: string;
}

function UserCreatePage({ catData, tagData }: any) {
  const [newPost, setNewPost] = useState<INewPost>({
    title: '',
    content: '',
    tag: [],
    category: catData[0],
  });

  const handleUpload = () => {
    const tagCheckbox: NodeList | any = document.querySelectorAll('.tagcheckbox');

    console.log('--------------');
    console.log('newPost: ', newPost);
    console.log('--------------');

    tagCheckbox.forEach((tagItem: HTMLInputElement) => {
      tagItem.checked = false;
    });

    setNewPost({
      title: '',
      content: '',
      tag: [],
      category: catData[0],
    });
  };

  // Select tags
  useEffect(() => {
    const tagE: HTMLElement | any = document.querySelector('.tag');
    const tagSelect: HTMLElement | any = document.querySelector('.tagselect');
    const tagCheckbox: NodeList | any = document.querySelectorAll('.tagcheckbox');

    tagSelect.addEventListener('click', () => {
      if (tagE.style.display === 'flex') {
        tagE.style.display = 'none';
      } else {
        tagE.style.display = 'flex';
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
    <div className="mr-16 mt-3">
      <ModalPost
        newPost={newPost}
        setNewPost={setNewPost}
        catData={catData}
        handleUpload={handleUpload}
        tagData={tagData}
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
