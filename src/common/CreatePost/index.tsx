/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Link from 'next/link';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/router';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MarkDown from '../MarkDown/MarkDown';
import Select from 'react-select';

function ModalPost({
  newPost,
  setNewPost,
  catData,
  handleSubmit,
  tagData,
  changeStatus,
  changePublic,
}: {
  newPost: any;
  setNewPost: any;
  catData: any;
  handleSubmit: any;
  tagData: any;
  changeStatus: any;
  changePublic: any;
}): JSX.Element {
  const router = useRouter();

  const goHomePage = () => {
    router.push('/');
  };

  const tagOptions: any[] = tagData?.map((tag: any) => ({ value: tag.name, label: tag.name }));
  const catOptions: any[] = catData?.map((tag: any) => ({ value: tag.name, label: tag.name }));

  const sectionNoOptions: any = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
  ];

  return (
    <div className="markdown mx-auto relative w-full text-gray-700 text-base lg:text-sm sm:text-sm ssm:text-sm">
      <div className="flex flex-row md:flex-col sm:flex-col ssm:flex-col h-full bg-white rounded-tl-lg rounded-bl-lg">
        <div className="w-2/3 md:w-full sm:w-full ssm:w-full">
          <div className="flex relative w-full justify-between rounded-tl-2xl bg-white border-b-2 p-3">
            <div className="flex items-center text-gray-600 text-sm">
              <Link href="/">
                <p className="leading-8 cursor-pointer">Home</p>
              </Link>
              <ArrowForwardIosIcon className="px-2" />
              <Link href="/user/create">
                <p className="leading-8 cursor-pointer text-sm text-gray-900">Create Post</p>
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
          <div className="flex w-full bg-white h-8 items-center p-3 border-b-2">
            <p className="flex w-32 leading-8 ml-4 text-gray-900 font-medium">Tilte:</p>
            <input
              className="px-3 ml-2 w-full"
              value={newPost.title}
              onChange={(e) => setNewPost((state: any) => ({ ...state, title: e.target.value }))}
              type="text"
              placeholder="Enter title"
            />
          </div>
          <div className="flex w-full bg-white items-center p-3 border-b-2">
            <p className="flex w-32 ml-4 text-gray-900 font-medium ">Short content:</p>
            <textarea
              className="px-3 ml-2 w-full"
              value={newPost.shortContent}
              onChange={(e) =>
                setNewPost((state: any) => ({ ...state, shortContent: e.target.value }))
              }
              placeholder="Enter short content"
            />
          </div>
          <MarkDown content={newPost.content} setNewPost={setNewPost} />
        </div>
        <div className="w-1/3 flex flex-col justify-between shadow-md rounded-md ml-6 md:w-full sm:w-full ssm:w-full md:ml-0 sm:ml-0 ssm:ml-0">
          <div className="flex flex-col justify-around w-full bg-opacity-50 py-3 px-5">
            <div className="flex items-start mb-3 border-b border-gray-300 pb-1 md:w-1/2">
              <p className="w-23 font-medium mr-8 lg:mr-1">Status:</p>
              <div className="flex">
                <Checkbox defaultChecked disabled onChange={changeStatus} />
              </div>
            </div>
            <div className="flex items-start mb-3 border-b border-gray-300 pb-1 md:w-1/2">
              <p className="w-23 font-medium mr-8 lg:mr-1">Section No:</p>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={sectionNoOptions[0]}
                onChange={(value: any) => {
                  setNewPost((state: any) => ({ ...state, sectionNo: +value.value }));
                }}
                name="sectionno"
                options={sectionNoOptions}
              />
            </div>
            <div className="flex mb-3 border-b border-gray-300 pb-1">
              <p className="w-23 font-medium mr-8 lg:mr-1">Category:</p>
              <div className="">
                <Select
                  className="basic-single mb-1"
                  classNamePrefix="select"
                  placeholder="Main category"
                  name="mainCategory"
                  options={catOptions}
                  onChange={(value: any) => {
                    setNewPost((state: any) => ({ ...state, mainCategory: value.value }));
                  }}
                />
                <Select
                  className="basic-multi-select"
                  isMulti
                  classNamePrefix="select"
                  placeholder="Related category"
                  name="relatedCategory"
                  options={catOptions}
                  onChange={(value) => {
                    const newrelCat = value.map((cat: any) => cat.value);
                    setNewPost((state: any) => ({ ...state, relatedCategory: newrelCat }));
                  }}
                />
              </div>
            </div>
            <div className="flex border-b border-gray-300 pb-1">
              <p className="w-23 font-medium mr-8 lg:mr-1">Tag:</p>
              <Select
                className="basic-multi-select"
                isMulti
                classNamePrefix="select"
                placeholder="Choose tag"
                name="relatedCategory"
                options={tagOptions}
                onChange={(value) => {
                  const newTag = value.map((tag: any) => tag.value);
                  setNewPost((state: any) => ({ ...state, tag: newTag }));
                }}
              />
            </div>
          </div>
          <div className="flex justify-between mb-3 pl-[10%] pr-[10%]">
            <button
              onClick={goHomePage}
              className="w-[30%] p-3 bg-gray-200 hover:bg-gray-400 rounded font-semibold tracking-wider"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="w-[30%] p-3 rounded bg-blue-300 hover:bg-blue-400  text-white font-bold tracking-wider active:animate-jelly"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPost;
