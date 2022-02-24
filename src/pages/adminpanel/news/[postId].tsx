/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import LayoutAdminPage from '../../../Components/admin/layout';
import MarkDown from '../../../Components/CreatePost/MarkDown';
import useFetch from '../../../hooks/use-fetch';

function EditNew({ _new }: any) {
  const router = useRouter();
  const [dateEvent, setDateEvent] = useState<Date | null>(null);

  const [newContent, setNewContent] = useState<any>({
    content: _new.data.content,
  });
  const [newTitle, setNewTitle] = useState<string>(_new.data.title);
  const [newShortContent, setNewShortContent] = useState<string>(_new.data.shortContent);
  const [newType, setNewType] = useState<any>(_new.data.type);
  const [status, setStatus] = useState<boolean>(_new.data.status === '1');

  const refEdit = useRef(false);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const updatePostHandler = async () => {
    const response = await useFetch(`/api/v1/news/${_new.data.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        news: {
          title: newTitle,
          slug: null,
          shortContent: newShortContent,
          content: newContent.content,
          thumbnail: null,
          images_banner: null,
          status: status ? '1' : '0',
          publishedAt: null,
          eventDate: dateEvent,
          type: newType,
        },
      }),
    });

    if (response.message === 200) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Status has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
      router.replace('/adminpanel/news');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const setEdited = (value: boolean) => {
    refEdit.current = value;
  };

  return (
    <LayoutAdminPage title="Edit a New">
      <div className="py-4 w-full">
        <h5 className="pb-4 mb-4 border-b-2 border-gray-600">Edit New</h5>
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
              <MarkDown
                content={newContent.content}
                setNewPost={setNewContent}
                setEdited={setEdited}
              />
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
              <Checkbox {...label} checked={status} onClick={() => setStatus(!status)} />
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

export async function getServerSideProps(context: any) {
  const { postId } = context.query;
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news/${postId}/detail`);
  const _new = await res.json();

  // Pass data to the page via props
  return { props: { _new } };
}

export default EditNew;
