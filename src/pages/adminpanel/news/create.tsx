/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';

import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import LayoutAdminPage from '../../../Components/admin/layout';
import MarkDown from '../../../Components/CreatePost/MarkDown';
import useFetch from '../../../hooks/use-fetch';
// import useFetch from '../../../hooks/use-fetch';

function EditPost() {
  const [dateEvent, setDateEvent] = React.useState<Date | null>(null);
  console.log(dateEvent);

  const [newContent, setNewContent] = useState<any>({
    content: '',
  });
  const [newTitle, setNewTitle] = useState<string>('');
  const [newShortContent, setNewShortContent] = useState<string>('');
  const [newType, setNewType] = useState<any>('');
  // const [status, setStatus] = useState<boolean>(true);

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const updatePostHandler = async () => {
    const res = await useFetch('/api/v1/news', {
      method: 'POST',
      body: JSON.stringify({
        news: {
          title: newTitle,
          slug: null,
          shortContent: newShortContent,
          content: newContent.content,
          thumbnail: null,
          images_banner: null,
          status: 1,
          publishedAt: null,
          eventDate: null,
          type: newType,
        },
      }),
    });

    if (res?.message === 200) {
      await fetch('/', {
        method: 'HEAD',
      });
      Swal.fire('Add a new successfully!');
    } else {
      Swal.fire('Something went wrong, please try again later!');
    }
  };

  return (
    <LayoutAdminPage title="Create a New">
      <HeaderAdmin
        titlePage="Article"
        subTitlePage="Total number of articles 20"
        searchPlaceholder="Article title..."
      />
      <div className="py-4 w-full">
        <h5 className="pb-4 mb-4 border-b-2 border-gray-600">Article content</h5>
        <div className="flex flex-col items-center w-[70vw] mx-auto">
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end">Title*</span>
            <input
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
              className="w-full p-3 outline-none rounded ml-8"
              type="text"
            />
          </div>
          <div className="flex items-start w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end px-1 py-2">
              Short content*
            </span>
            <textarea
              className="w-full py-4 px-3 outline-none resize-none rounded ml-8 overflow-y-hidden"
              onChange={(e) => setNewShortContent(e.target.value)}
              value={newShortContent}
            />
          </div>
          <div className="flex items-start w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end">Main content*</span>
            <div className="outline-none rounded ml-8 h-full w-full">
              {/* <textarea className="w-full py-2 px-4 outline-none rounded ml-8 h-72" /> */}
              <MarkDown
                content={newContent.content}
                setNewPost={setNewContent}
                // onChange={(e: any) => setNewContent(e.target.value)}
              />
              {/* <MarkDown content={data?.body} setNewPost={() => {}} /> */}
            </div>
          </div>
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end ">Type</span>
            <input
              className="w-full py-2 px-4 outline-none rounded ml-8"
              type="text"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            />
          </div>
        </div>
        <h5 className="pb-4 my-4">Customize News</h5>
        <div className="flex flex-col items-center w-[70vw] mx-auto">
          <div className="flex items-center w-full mt-8 ml-[-120px]">
            <span className="w-48 flex font-medium text-gray-600 justify-end">Event Date</span>
            <div className="ml-8">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Set event date"
                  value={dateEvent}
                  onChange={(newValue) => {
                    setDateEvent(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} size="small" />}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="flex items-center w-full mt-8">
            <span className="w-40 flex font-medium text-gray-600 justify-end ">Status</span>
            <div className="w-full ml-8">
              <Checkbox
                {...label}
                checked
                // onClick={() => handleCheckItemClick(_new)}
              />
            </div>
          </div>
          <button
            onClick={updatePostHandler}
            className="py-2 px-6 rounded bg-white text-gray-600 font-medium tracking-wide  mt-8"
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
