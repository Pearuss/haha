/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { FormEvent, useState } from 'react';

import Switch from '@material-ui/core/Switch';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Select from 'react-select';
import Swal from 'sweetalert2';

import useFetch from '../../hooks/use-fetch';
import {
 Article, Category, INewPost, Tag,
} from '../../models';
import { countWord } from '../../utilities/helper';
import {
  postSchema,
  postTitleSchema,
  postContentSchema,
  postShortContentSchema,
  postTagSchema,
  postCategorySchema,
  postImageSchema,
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
  setIsLoading,
  imageHandler,
  removeImage,
  articleId,
  setEdited,
}: {
  newPost: INewPost;
  setNewPost: Function;
  changeTitle: any;
  changeShortContent: any;
  changeSectionNo: any;
  changeMainCategory: any;
  changeRelatedCategory: any;
  changePartialId: any;
  changeTag: any;
  catData: Category[];
  tagData: Tag[];
  myArticle: Article[];
  changeStatus: any;
  changePublic: any;
  setIsLoading: any;
  imageHandler: Function | any;
  removeImage: Function;
  articleId: any;
  setEdited: any;
}): JSX.Element {
  const router = useRouter();

  const goHomePage = () => {
    router.push('/');
  };
  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const [isErrorShortContent, setIsErrorShortContent] = useState(false);
  const [isErrorContent, setIsErrorContent] = useState(false);
  const [isErrorTag, setIsErrorTag] = useState(false);
  const [isErrorCategory, setIsErrorCategory] = useState(false);
  const [isErrorImage, setIsErrorImage] = useState(false);

  const tagOptions: { value: string; label: string }[] = tagData?.map((tag: any) => ({
    value: tag.id,
    label: tag.name,
  }));
  const catOptions: { value: string; label: string }[] = catData?.map((cat: any) => ({
    value: cat.id,
    label: cat.name,
  }));
  const partialOption: { value: string; label: string }[] = myArticle?.map((article: any) => ({
    value: article.id,
    label: article.title,
  }));
  const sectionNoOptions: { value: string; label: string }[] = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
  ];
  // Submit handle
  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = {
      title: newPost.title,
      shortContent: countWord(newPost.shortContent),
      content: countWord(newPost.content),
      tag: newPost.tag,
      mainCategory: newPost.mainCategory,
      image: newPost.image,
    };
    const isValid = await postSchema.isValid(formData);

    if (isValid) {
      setIsLoading(true);
      const { message }: any = await useFetch(`/api/v1/user/article/${articleId}`, {
        method: 'PUT',
        body: JSON.stringify({
          article: {
            partialId: newPost.partialId === 0 ? null : newPost.partialId,
            sectionNo: newPost.partialId === 0 ? null : newPost.sectionNo,
            title: newPost.title,
            shortContent: newPost.shortContent,
            content: newPost.content,
            thumbnail: newPost.image,
            status: 1,
            main_cat_id: newPost.mainCategory,
          },
          tagIds: newPost.tag,
          categoryIds: newPost.relatedCategory,
        }),
      });
      if (message === 200) {
        setIsLoading(false);
        await fetch('/', {
          method: 'HEAD',
        });
        router.push('/');
        Swal.fire({
          title: 'Successfully',
          text: 'Article is created successfully!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            router.reload();
          } else {
            setTimeout(() => {
              router.reload();
            }, 500);
          }
        });
        // Swal.fire('Article is edited successfully!');
        // Swal.fire({
        //   title: 'Article is edited successfully!',
        //   confirmButtonText: 'Ok',
        // }).then((result) => {
        //   /* Read more about isConfirmed, isDenied below */
        //   if (result.isConfirmed) {
        //   } else {
        //     setTimeout(() => {
        //       router.reload();
        //     }, 500);
        //   }
        // });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Title already exists',
          text: 'Please change your title!',
        });
      }
      setIsLoading(false);
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

      const formContent = {
        content: countWord(newPost.content),
      };
      const isValidContent = await postContentSchema.isValid(formContent);
      setIsErrorContent(!isValidContent);

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

      const formImage = {
        image: newPost.image,
      };
      const isValidImage = await postImageSchema.isValid(formImage);
      setIsErrorImage(!isValidImage);
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
                  <p className="leading-8 cursor-pointer text-sm">Edit Post</p>
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
              <p className="leading-8 ml-4 text-black font-bold text-3xl">Edit post</p>
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
                label={isErrorTitle ? 'Title is required field.' : ''}
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
                label={isErrorShortContent ? 'Short content must be more than 30 words.' : ''}
              />
            </div>
            <div className="w-full bg-white">
              <div className="flex items-center">
                <p className="flex p-3 w-32 ml-4 text-gray-900 font-medium ">Content:</p>
                {isErrorContent ? (
                  <p className="text-darkRed">Content must be more than 100 words</p>
                ) : (
                  ''
                )}
              </div>
              <div className={`border ${isErrorContent ? 'border-darkRed' : ''} `}>
                <MarkDown content={newPost.content} setNewPost={setNewPost} setEdited={setEdited} />
              </div>
            </div>
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
                  onChange={changeSectionNo}
                  value={sectionNoOptions?.filter(
                    (option: any) => option.value === newPost.sectionNo?.toString(),
                  )}
                  name="sectionno"
                  options={sectionNoOptions}
                />
              </div>
              <div className="flex mb-3 border-b border-gray-300 pb-1">
                <p className="w-23 font-medium mr-8 lg:mr-1">Partial Id:</p>
                <Select
                  isClearable
                  className="basic-single mb-1"
                  classNamePrefix="select"
                  placeholder="Enter Article of User"
                  name="partialId"
                  value={partialOption?.filter((option: any) => option.value === newPost.partialId)}
                  options={partialOption}
                  onChange={changePartialId}
                />
              </div>
              <div className="flex mb-3 border-b border-gray-300 pb-1">
                <p className="w-23 font-medium mr-8 lg:mr-1">Category:</p>
                <div>
                  <Select
                    className={`basic-single mb-1 ${
                      isErrorCategory ? 'border border-darkRed rounded-md' : ''
                    }`}
                    classNamePrefix="select"
                    placeholder="Main category"
                    name="mainCategory"
                    options={catOptions}
                    value={catOptions?.filter(
                      (option: any) => option.value === newPost.mainCategory,
                    )}
                    onChange={changeMainCategory}
                  />
                  <Select
                    className="basic-multi-select"
                    isMulti
                    classNamePrefix="select"
                    placeholder="Related category"
                    name="relatedCategory"
                    value={catOptions?.filter((option) => newPost.relatedCategory.includes(option.value))}
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
                  value={tagOptions?.filter((option) => newPost.tag.includes(option.value))}
                  options={tagOptions}
                  onChange={changeTag}
                />
              </div>
              <div className="pb-1">
                <div className="flex items-center">
                  <p className="w-23 font-medium lg:mr-1">Image:</p>
                  {isErrorImage ? <p className="text-darkRed">Image is required.</p> : ''}
                </div>
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
                onClick={() => setEdited(false)}
                className="w-[30%] p-3 rounded bg-blue-300 hover:bg-blue-400  text-white font-bold tracking-wider active:animate-jelly"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ModalPost;
