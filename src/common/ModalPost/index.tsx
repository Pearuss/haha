/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { HighlightOff } from '@material-ui/icons';
import Image from 'next/image';

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
  return (
    <div className="cover hidden fixed p-5 w-screen h-screen bg-gray-700 bg-opacity-50 top-0 left-0 z-50">
      <div className="markdown rounded-3xl w-1/2 absolute top-20 left-1/4">
        <div className="flex relative justify-center w-full rounded-t-2xl bg-white border-b-2 py-3">
          <p className="leading-8 ml-4 text-black font-bold text-2xl">Create post</p>
          <HighlightOff className="closemarkdown absolute top-2 right-2 text-gray-700 hover:text-gray-600 cursor-pointer" />
        </div>
        <div className="flex w-full bg-white h-16 items-center p-3">
          <Image
            src="/images/post2.jpg"
            alt="Picture of the author"
            className="flex rounded-full translate-y-10"
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
        <div className="flex justify-around w-full bg-white py-3 px-2">
          <div className="flex">
            <p className="font-bold">Category:</p>
            <select className="category ml-3 cursor-pointer">
              {catData.map((item: any) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="flex">
            <p className="font-bold">Tag:</p>
            <div className="tagselect bg-gray-400 ml-2 px-2 cursor-pointer hover:bg-gray-300">
              Select
            </div>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleUpload}
          className="w-full p-3 bg-blue-800 hover:bg-blue-700 rounded-b-xl text-white font-bold tracking-wider"
        >
          Upload
        </button>
        <div className="absolute tag hidden flex-wrap -top-2 -right-1/3 w-1/3 h-full bg-white rounded-3xl border-gray-700 border-2 p-3">
          <p className="absolute flex w-full flex-wrap">
            {tagData.map((item: any) => (
              <div key={item.id} className="mr-3">
                <input className="mr-1 tagcheckbox" type="checkbox" name={item.name} id={item.id} />
                {`#${item.name}`}
              </div>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ModalPost;
