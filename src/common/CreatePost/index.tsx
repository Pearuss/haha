/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Switch from '@material-ui/core/Switch';
import Image from 'next/image';
import { useRouter } from 'next/router';

import MarkDown from '../MarkDown/MarkDown';

function ModalPost({
  newPost,
  setNewPost,
  catData,
  handleUpload,
  tagData,
}: {
  newPost: any;
  setNewPost: any;
  catData: any;
  handleUpload: any;
  tagData: any;
}): JSX.Element {
  const router = useRouter();

  const handleChangePublic = () => {
    setNewPost((state: any) => ({
      ...state,
      public: !state.public,
    }));
  };

  const goHomePage = () => {
    router.push('/');
  };
  return (
    <div className="markdown mx-auto relative w-full">
      <div className="flex flex-row h-full bg-white rounded-tl-lg rounded-bl-lg">
        <div className="w-2/3">
          <div className="flex relative w-full justify-between rounded-tl-2xl bg-white border-b-2 p-3">
            <p className="leading-8 text-gray-700 font-medium text-base">User/Create Post</p>
            <div className="flex items-center text-base font-medium text-gray-600">
              <Switch
                checked={newPost.public}
                onChange={handleChangePublic}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <p>Public</p>
            </div>
          </div>
          <div className="flex relative justify-center w-full bg-white border-b-2 py-3">
            <p className="leading-8 ml-4 text-black font-bold text-3xl">Create post</p>
          </div>
          <div className="flex w-full bg-white h-16 items-center p-3">
            <Image
              src="/images/post2.jpg"
              alt="Picture of the author"
              className="flex rounded-full"
              width={50}
              height={50}
            />
            <p className="flex leading-8  text-base ml-4 text-black font-bold ">Nguyen Chi Thong</p>
          </div>
          <div className="flex w-full bg-white h-8 items-center p-3 border-b-2 border-t-2">
            <p className="flex leading-8  text-base ml-4 text-black font-bold ">Tilte: </p>
            <input
              className="px-3 ml-2 w-full"
              value={newPost.title}
              onChange={(e) => setNewPost((state: any) => ({ ...state, title: e.target.value }))}
              type="text"
              placeholder="Enter post's title"
            />
          </div>
          <MarkDown content={newPost.content} setNewPost={setNewPost} />
        </div>
        <div className="relative w-1/3 border-l-2 rounded-tr-lg rounded-br-lg bg-mainColor bg-opacity-50">
          <div className="flex flex-col justify-around w-full bg-opacity-50 py-3 px-5">
            <div className="flex">
              <p className="font-bold text-xl">Category:</p>
              <select className="category ml-3 cursor-pointer w-44">
                {catData.map((item: any) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="flex mt-4">
              <p className="font-bold">Tag:</p>
              <div className="tagselect bg-gray-400 ml-2 px-2 cursor-pointer hover:bg-gray-300">
                Select
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={goHomePage}
            className="absolute bottom-3 left-10 w-1/3 p-3 bg-gray-200 hover:bg-blue-700 rounded-br-xl rounded-tl-xl text-black font-bold tracking-wider"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleUpload}
            className="absolute bottom-3 right-5 w-1/2 p-3 bg-lightGreen hover:bg-blue-700 rounded-br-xl rounded-tl-xl text-white font-bold tracking-wider"
          >
            Upload
          </button>
        </div>
      </div>
      <div className="absolute tag flex-wrap top-20 right-10 w-1/4 h-1/2 bg-white rounded-3xl border-gray-700 border-2 p-3">
        <p className="font-bold text-black mx-auto">Sellect Tag</p>
        <p className="absolute flex top-10 w-full flex-wrap">
          {tagData.map((item: any) => (
            <div key={item.id} className="mr-3">
              <input className="mr-1 tagcheckbox" type="checkbox" name={item.name} id={item.id} />
              {`#${item.name}`}
            </div>
          ))}
        </p>
      </div>
    </div>
  );
}

export default ModalPost;
