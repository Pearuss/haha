/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';

import Switch from '@material-ui/core/Switch';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Select from 'react-select';

import useFetch from '../../hooks/use-fetch';
import { countWord } from '../../utilities/helper';
import {
  postSchema,
  postTitleSchema,
  postShortContentSchema,
  postTagSchema,
  postCategorySchema,
} from '../../validation/createPost';
import MarkDown from './MarkDown';

function ModalPost({
  newPost,
  setNewPost,
  changeTitle,
  changeShortContent,
  changeSectionNo,
  changeMainCategory,
  changeRelatedCategory,
  changePartialId,
  changeTag,
  catData,
  tagData,
  myArticle,
  changeStatus,
  changePublic,
  imageHandler,
  removeImage,
}: {
  newPost: any;
  setNewPost: any;
  changeTitle: any;
  changeShortContent: any;
  changeSectionNo: any;
  changeMainCategory: any;
  changeRelatedCategory: any;
  changePartialId: any;
  changeTag: any;
  catData: any;
  tagData: any;
  myArticle: any;
  changeStatus: any;
  changePublic: any;
  imageHandler: any;
  removeImage: any;
}): JSX.Element {
  const router = useRouter();

  const goHomePage = () => {
    router.push('/');
  };

  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const [isErrorShortContent, setIsErrorShortContent] = useState(false);
  const [isErrorTag, setIsErrorTag] = useState(false);
  const [isErrorCategory, setIsErrorCategory] = useState(false);

  const tagOptions: any[] = tagData?.map((tag: any) => ({ value: tag.id, label: tag.name }));
  const catOptions: any[] = catData?.map((cat: any) => ({ value: cat.id, label: cat.name }));
  const partialOption: any[] = myArticle?.map((article: any) => ({
    value: article.id,
    label: article.title,
  }));
  const sectionNoOptions: any = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
  ];
  // Submit handle
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = {
      title: newPost.title,
      shortContent: countWord(newPost.shortContent),
      // content: countWord(newPost.content),
      tag: newPost.tag,
      mainCategory: newPost.mainCategory,
      image: newPost.image,
    };
    const isValid = await postSchema.isValid(formData);

    if (isValid) {
      const { message: value }: any = await useFetch('http://localhost:9500/api/v1/user/article', {
        method: 'POST',
        body: JSON.stringify({
          article: {
            partialId: newPost.partialId === 0 ? null : newPost.partialId,
            sectionNo: newPost.partialId === 0 ? null : newPost.sectionNo,
            title: newPost.title,
            shortContent: newPost.shortContent,
            content: newPost.content,
            thumbnail: null,
            status: 1,
            mainCatId: newPost.mainCategory,
          },
          tagIds: newPost.tag,
          categoryIds: newPost.relatedCategory,
        }),
      });
      if (value === 200) router.push('/');
    } else {
      const formTitle = {
        title: newPost.title,
      };
      const isValidTitle = await postTitleSchema.isValid(formTitle);
      setIsErrorTitle(!isValidTitle);

      const formShortContent = {
        shortContent: countWord(newPost.shortContent),
      };
      const isValidShortContent = await postShortContentSchema.isValid(formShortContent);
      setIsErrorShortContent(!isValidShortContent);

      const formTag = {
        tag: newPost.tag,
      };
      const isValidTag = await postTagSchema.isValid(formTag);
      setIsErrorTag(!isValidTag);

      const formCategory = {
        mainCategory: newPost.mainCategory,
      };
      const isValidCat = await postCategorySchema.isValid(formCategory);
      setIsErrorCategory(!isValidCat);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="markdown mx-auto relative w-full text-gray-700 text-base lg:text-sm sm:text-sm ssm:text-sm">
        <div className="flex flex-row md:flex-col sm:flex-col ssm:flex-col h-full bg-white rounded-tl-lg rounded-bl-lg">
          <div className="w-2/3 max-w-2/3 md:w-full sm:w-full ssm:w-full">
            <div className="flex relative w-full justify-between rounded-tl-2xl bg-white border-b-2 p-3">
              <div className="flex items-center text-gray-600 text-sm">
                <Link href="/">
                  <p className="leading-8 cursor-pointer">Home</p>
                </Link>
                <ArrowForwardIosIcon className="px-2" />
                <Link href="/user/create">
                  <p className="leading-8 cursor-pointer text-sm">Create Post</p>
                </Link>
              </div>
              <div className="flex items-center font-medium text-gray-600">
                <Switch
                  checked={newPost.public}
                  onChange={changePublic}
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <p>Public</p>
              </div>
            </div>
            <div className="flex relative justify-center w-full bg-white border-b-2 py-3">
              <p className="leading-8 ml-4 text-black font-bold text-3xl">Create post</p>
            </div>
            <div className="flex w-full bg-white p-3 border-b-2">
              <p className="flex w-32 leading-8 ml-4 text-gray-900 font-medium">Tilte:</p>
              <TextField
                id="outlined-basic"
                value={newPost.title}
                placeholder="Enter title"
                onChange={changeTitle}
                className="w-full"
                size="small"
                variant="outlined"
                error={isErrorTitle}
                helperText={isErrorTitle ? 'This is required field.' : ''}
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
                onChange={changeShortContent}
                value={newPost.shortContent}
                error={isErrorShortContent}
                helperText={isErrorShortContent ? 'This field must be more than 30 words.' : ''}
              />
            </div>
            <MarkDown content={newPost.content} setNewPost={setNewPost} />
          </div>
          <div className="w-1/3 max-w-1/3 flex flex-col justify-between border-l border-gray-300 shadow-md rounded-md md:w-full sm:w-full ssm:w-full md:ml-0 sm:ml-0 ssm:ml-0">
            <div className="flex flex-col justify-around w-full bg-opacity-50 py-3 px-5">
              <div className="flex items-start mb-3 border-b border-gray-300 pb-1 md:w-1/2">
                <p className="w-23 font-medium mr-8 lg:mr-1">Status:</p>
                <div className="flex">
                  <Checkbox defaultChecked disabled onChange={changeStatus} />
                </div>
              </div>
              <div className="flex mb-3 border-b border-gray-300 pb-1">
                <p className="w-23 font-medium mr-8 lg:mr-1">Section No:</p>
                <Select
                  className="basic-single border"
                  classNamePrefix="select"
                  defaultValue={sectionNoOptions[0]}
                  onChange={changeSectionNo}
                  name="sectionno"
                  options={sectionNoOptions}
                />
              </div>
              <div className="flex mb-3 border-b border-gray-300 pb-1">
                <p className="w-23 font-medium mr-8 lg:mr-1">Partial Id:</p>
                <Select
                  className={`basic-single mb-1 ${
                    isErrorCategory ? 'border border-darkRed rounded-md' : ''
                  }`}
                  classNamePrefix="select"
                  placeholder="Enter Article of User"
                  name="partialId"
                  options={partialOption}
                  onChange={changePartialId}
                />
              </div>
              <div className="flex mb-3 border-b border-gray-300 pb-1">
                <p className="w-23 font-medium mr-8 lg:mr-1">Category:</p>
                <div className="">
                  <Select
                    className={`basic-single mb-1 ${
                      isErrorCategory ? 'border border-darkRed rounded-md' : ''
                    }`}
                    classNamePrefix="select"
                    placeholder="Main category"
                    name="mainCategory"
                    options={catOptions}
                    onChange={changeMainCategory}
                  />
                  <Select
                    className="basic-multi-select"
                    isMulti
                    classNamePrefix="select"
                    placeholder="Related category"
                    name="relatedCategory"
                    options={catOptions}
                    onChange={changeRelatedCategory}
                  />
                </div>
              </div>
              <div className="flex border-b border-gray-300 pb-1">
                <p className="w-23 font-medium mr-8 lg:mr-1">Tag:</p>
                <Select
                  className={`basic-multi-select ${
                    isErrorTag ? 'border border-darkRed rounded-md' : ''
                  }`}
                  isMulti
                  classNamePrefix="select"
                  placeholder="Choose tag"
                  name="relatedCategory"
                  options={tagOptions}
                  onChange={changeTag}
                />
              </div>
              <div className="pb-1">
                <p className="w-23 font-medium mr-8 lg:mr-1">Image:</p>
                <div className="flex flex-wrap gap-2 w-full">
                  {newPost.image ? (
                    <div className="relative flex-1 min-w-[49%] md:min-w-[30%]  h-auto max-h-[300] p-1 mt-4  rounded border border-gray-300">
                      <img src={newPost.image} alt="" className="overflow-hidden rounded" />
                      <CloseIcon
                        onClick={() => removeImage()}
                        className="absolute -top-2 -right-2 bg-gray-300 cursor-pointer rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="label cursor-pointer opacity-60 hover:opacity-40 w-24 h-24 pt-4">
                      <label className="image-upload imgUpload" htmlFor="inputImg">
                        <AddCircleOutlineRoundedIcon className="w-full h-auto text-center cursor-pointer" />
                      </label>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    name="image-upload"
                    id="inputImg"
                    className="hidden"
                    onChange={imageHandler}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-2 mb-3 pl-[10%] pr-[10%] border-t border-gray-300">
              <button
                onClick={goHomePage}
                className="w-[30%] p-3 bg-gray-200 hover:bg-gray-400 rounded font-semibold tracking-wider"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-[30%] p-3 rounded bg-blue-300 hover:bg-blue-400  text-white font-bold tracking-wider active:animate-jelly"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ModalPost;
