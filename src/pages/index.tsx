/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import ModalPost from '../common/ModalPost';
import Post from '../common/Post';
import { MainLayout } from '../layout';

// import { LayoutMeta } from 'next';

interface PostItem {
  id: string;
  title: string;
  img: string;
  body: string;
}

interface INewPost {
  title: string;
  content: string;
  tag: string[];
  category: string;
}

function HomePage({ data, tagData, catData }: any) {
  const [newPost, setNewPost] = useState<INewPost>({
    title: '',
    content: '',
    tag: [],
    category: catData[0],
  });

  const onClickMarkDown = () => {
    const cover: any = document.querySelector('.cover');
    const markdown: any = document.querySelector('.markdown');

    markdown.style.display = 'block';
    cover.style.display = 'block';
  };

  const handleUpload = () => {
    const tagCheckbox: NodeList | any = document.querySelectorAll('.tagcheckbox');

    console.log('--------------');
    console.log('newPost: ', newPost);
    console.log('--------------');

    tagCheckbox.forEach((tagItem: HTMLInputElement) => {
      tagItem.checked = false;
    });

    const cover: any = document.querySelector('.cover');
    const markdown: any = document.querySelector('.markdown');

    markdown.style.display = 'none';
    cover.style.display = 'none';

    setNewPost({
      title: '',
      content: '',
      tag: [],
      category: catData[0],
    });
  };

  // Show and hide modal creat post
  useEffect(() => {
    const cover: HTMLElement | any = document.querySelector('.cover');
    const markdown: HTMLElement | any = document.querySelector('.markdown');
    const closemarkdown: HTMLElement | any = document.querySelector('.closemarkdown');

    cover?.addEventListener('click', (e: React.ChangeEvent<HTMLInputElement>) => {
      const tmp = e.target;
      if (tmp.isEqualNode(cover)) {
        markdown.style.display = 'none';
        cover.style.display = 'none';
      }
    });

    closemarkdown.addEventListener('click', () => {
      markdown.style.display = 'none';
      cover.style.display = 'none';
    });
  }, []);

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
    <div className="mr-16">
      <p className="text-4xl pb-6 text-blue-500">Create diagrams online realtime collaboration!</p>
      <div className="flex w-full bg-white rounded-md h-16 items-center p-3">
        <Image
          src="/images/post2.jpg"
          alt="Picture of the author"
          className="flex rounded-full translate-y-10"
          width={50}
          height={50}
        />
        <input
          type="text"
          value={newPost.content}
          onChange={() => {}}
          defaultValue=""
          placeholder="What are you thinking?"
          className="w-full text-white py-3 bg-blue-300 placeholder-white rounded-full ml-3 text-md box-border px-6 hover:bg-blue-400 cursor-pointer"
          onClick={onClickMarkDown}
        />
      </div>
      <div className="grid grid-cols-4 h-20 gap-10 pt-4 mb-20">
        <textarea className="w-full h-full" />
        <textarea className="w-full h-full" />
        <textarea className="w-full h-full" />
        <textarea className="w-full h-full" />
      </div>
      {data?.map((post: PostItem) => (
        <Post key={post.id} post={post} />
      ))}
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
HomePage.Layout = MainLayout;

export default HomePage;

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3001/posts');
  const posts = await res.json();

  const resTag = await fetch('http://localhost:3001/tags');
  const tags = await resTag.json();
  const tagData = tags.followingTags;

  const resCat = await fetch('http://localhost:3001/category');
  const catData = await resCat.json();

  return {
    props: {
      data: posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        body: post.body,
        views: post.views,
        comments: post.comments,
        tags: post.tags,
        author: post.author,
      })),
      tagData,
      catData,
    },
    revalidate: 5,
  };
};
