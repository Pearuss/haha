/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

// import Link from 'next/link';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import TextField from '@mui/material/TextField';
import Select from 'react-select';
import useSWR from 'swr';

import MarkDown from '../../../Components/CreatePost/MarkDown';
import { HeaderLayout } from '../../../layout';
import { truncate } from '../../../utilities/helper';

function EditPost() {
  const data: any = [];
  const { data: tagData }: any = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/tags`);

  const tagOptions: any[] = tagData?.data.map((tag: any) => ({
    value: tag.name,
    label: tag.name,
  }));
  const catOptions: any[] = []?.map((tag: any) => ({ value: tag.name, label: tag.name }));

  return (
    <form className="w-full h-auto min-h-screen">
      <div className="markdown mx-auto relative w-full text-gray-700 text-base lg:text-sm sm:text-sm ssm:text-sm">
        <div className="flex flex-row min-h-[70vh]  md:flex-col sm:flex-col ssm:flex-col h-full bg-white rounded-tl-lg rounded-bl-lg">
          <div className="w-2/3 max-w-2/3 min-h-[70vh]  md:w-full sm:w-full ssm:w-full">
            <div className="flex relative justify-center w-full bg-white border-b-2 py-3">
              <p className="leading-8 ml-4 text-black font-bold text-3xl">Post Management</p>
            </div>
            <div className="flex w-full bg-white p-3 border-b-2">
              <p className="flex w-32 leading-8 ml-4 text-gray-900 font-medium">Tilte:</p>
              <TextField
                id="outlined-basic"
                value={data?.title}
                placeholder="Enter title"
                // onChange={changeTitle}
                className="w-full"
                size="small"
                variant="outlined"
                // error={isErrorTitle}
                // helperText={isErrorTitle ? 'This is required field.' : ''}
              />
            </div>
            <div className="flex w-full bg-white p-3 border-b-2">
              <p className="flex w-32 ml-4 text-gray-900 font-medium ">Short content:</p>
              <TextField
                id="outlined-multiline-flexible"
                className="w-full"
                minRows={2}
                placeholder="Enter short content"
                multiline
                // onChange={changeShortContent}
                value={truncate(data?.body, 60)}
                // error={isErrorShortContent}
                // helperText={isErrorShortContent ? 'This field must be more than 30 words.' : ''}
              />
            </div>
            <MarkDown content={data?.body} setNewPost={() => {}} />
          </div>
          <div className="w-1/3 max-w-1/3 flex flex-col justify-between border border-gray-300 mt-[55px] shadow-sm rounded-md md:w-full sm:w-full ssm:w-full md:ml-0 sm:ml-0 ssm:ml-0">
            <div className="flex flex-col justify-around w-full bg-opacity-50 py-3 px-5">
              <div className="flex mb-3 border-b border-gray-300 pb-1">
                <p className="w-23 font-medium mr-8 lg:mr-1">Category:</p>
                <div>
                  <Select
                    // className={`basic-single mb-1 ${
                    //   isErrorCategory ? 'border border-darkRed rounded-md' : ''
                    // }`}
                    className="basic-single mb-1"
                    classNamePrefix="select"
                    placeholder="Main category"
                    name="mainCategory"
                    options={catOptions}
                    // onChange={changeMainCategory}
                  />
                  <Select
                    className="basic-multi-select"
                    isMulti
                    classNamePrefix="select"
                    placeholder="Related category"
                    name="relatedCategory"
                    options={catOptions}
                    // onChange={changeRelatedCategory}
                  />
                </div>
              </div>
              <div className="flex border-b border-gray-300 pb-1">
                <p className="w-23 font-medium mr-8 lg:mr-1">Tag:</p>
                <Select
                  //   className={`basic-multi-select ${
                  //     isErrorTag ? 'border border-darkRed rounded-md' : ''
                  //   }`}
                  className="basic-multi-select "
                  isMulti
                  classNamePrefix="select"
                  placeholder="Choose tag"
                  name="relatedCategory"
                  options={tagOptions}
                  //   onChange={changeTag}
                />
              </div>
              <div className="pb-1">
                <p className="w-23 font-medium mr-8 mt-3 lg:mr-1">Image:</p>
                <div className="flex flex-wrap gap-2 w-full">
                  <input
                    type="file"
                    accept="image/*"
                    name="image-upload"
                    id="inputImg"
                    className="hidden"
                    // onChange={imageHandler}
                  />
                  <div className="label cursor-pointer opacity-60 hover:opacity-40 w-24 h-24 pt-4">
                    <label className="image-upload imgUpload" htmlFor="inputImg">
                      <AddCircleOutlineRoundedIcon className="w-full h-auto text-center cursor-pointer" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-2 mb-3 pl-[10%] pr-[10%] border-t border-gray-300">
              <button
                // onClick={goHomePage}
                className="w-[30%] p-3 bg-gray-200 hover:bg-gray-400 rounded font-semibold tracking-wider"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-[30%] p-3 rounded bg-blue-300 hover:bg-blue-400  text-white font-bold tracking-wider active:animate-jelly"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
EditPost.Layout = HeaderLayout;
export default EditPost;

// export const getStaticPaths = async () => {
//   const res = await fetch('http://localhost:3001/posts?_limit=200');
//   const posts = await res.json();

//   const paths = posts?.data?.map((post: any) => ({
//     params: { id: post.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: 'blocking',
//   };
// };

// export const getStaticProps = async (context: any) => {
//   const { id } = context?.params;
//   if (!id) return { notFound: true };
//   const res = await fetch(`http://localhost:3001/posts/${id}?_limit=200`);
//   const posts = await res.json();

//   return {
//     props: {
//       data: posts,
//     },
//     revalidate: 1,
//   };
// };
