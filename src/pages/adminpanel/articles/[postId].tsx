/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';

import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import LayoutAdminPage from '../../../Components/admin/layout';
import MarkDown from '../../../Components/CreatePost/MarkDown';
// import useFetch from '../../../hooks/use-fetch';

function EditPost({ data }: any) {
  const [value, setValue] = React.useState<Date | null>(null);

  const [newTitle, setNewTitle] = useState(data?.title || '');
  // const [newMainContent, setNewMainContent] = useState(data.body);
  // const titleRef = useRef(data.title);

  const updatePostHandler = () => {
    // const newMainContent = mainContentRef.current.value;
    // const postData = { ...data, title: newTitle };
    // useFetch(`http://localhost:3001/posts/${data.id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(postData),
    // });
  };

  return (
    <LayoutAdminPage title="Update Post">
      <HeaderAdmin
        titlePage="Article"
        subTitlePage="Total number of articles 20"
        searchPlaceholder="Article title..."
        showSearch={true}
      />
      <div className="py-4 w-full">
        <h5 className="pb-4 mb-4 border-b-2 border-gray-600">Article content</h5>
        <div className="flex flex-col items-center w-[50vw] mx-auto">
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end">Title*</span>
            <input
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
              className="w-full py-3 px-4 outline-none rounded ml-8"
              type="text"
            />
          </div>
          <div className="flex items-start w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end">Short content*</span>
            <textarea className="w-full py-2 px-4 outline-none resize-none rounded ml-8" />
          </div>
          <div className="flex items-start w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end">Main content*</span>
            <div className="outline-none rounded ml-8 h-full w-[796px]">
              {/* <textarea className="w-full py-2 px-4 outline-none rounded ml-8 h-72" /> */}
              <MarkDown content={data?.body} setNewPost={() => {}} />
            </div>
          </div>
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end ">Picture*</span>
            <input className="w-full py-2 px-4 outline-none rounded ml-8" type="text" />
          </div>
        </div>
        <h5 className="pb-4 my-4">Customize Posts</h5>
        <div className="flex flex-col items-center w-[50vw] mx-auto">
          <div className="flex items-center w-full mt-8 ml-[-120px]">
            <span className="w-48 flex font-medium text-gray-600 justify-end">
              Post closing date
            </span>
            <div className="ml-8">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Closed Date"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} size="small" />}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end ">Status</span>
            <div className="w-full ml-8">Preview</div>
          </div>
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end outline-none ">
              Number of edits
            </span>
            <input className="w-full ml-8 py-2 px-4 rounded" type="text" />
          </div>
          <button
            onClick={updatePostHandler}
            className="ml-auto py-2 px-6 rounded bg-white text-gray-600 font-medium tracking-wide  mt-8"
          >
            Confirm
          </button>
        </div>
      </div>
    </LayoutAdminPage>
  );
}

export default EditPost;

// export const getStaticPaths = async () => {
//   const res = await fetch('http://localhost:3001/posts?_limit=200');
//   const posts = await res.json();

//   const paths = posts?.data?.map((post: any) => ({
//     params: { postId: post.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: 'blocking',
//   };
// };

// export const getStaticProps = async (context: any) => {
//   const { postId } = context?.params;
//   if (!postId) return { notFound: true };
//   const res = await fetch(`http://localhost:3001/posts/${postId}?_limit=200`);
//   const posts = await res.json();

//   return {
//     props: {
//       data: posts,
//     },
//     revalidate: 1,
//   };
// };

export const getStaticPaths = async () => {
  // const res = await fetch('http://localhost:3001/posts?_limit=200');
  // const posts = await res.json();

  const paths = [].map(() => ({
    params: { postId: '1' },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context: any) => {
  const { postId } = context?.params;
  if (!postId) return { notFound: true };
  // const res = await fetch(`http://localhost:3001/posts/${postId}?_limit=200`);
  // const posts = await res.json();

  return {
    props: {
      data: [],
    },
    revalidate: 1,
  };
};
