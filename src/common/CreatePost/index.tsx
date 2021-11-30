/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Link from 'next/link';
import Switch from '@material-ui/core/Switch';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
    <div className="markdown mx-auto relative w-full text-gray-700">
      <div className="flex flex-row h-full bg-white rounded-tl-lg rounded-bl-lg">
        <div className="flex-1">
          <div className="flex relative w-full justify-between rounded-tl-2xl bg-white border-b-2 p-3">
            <div className="flex items-center text-gray-600 text-sm">
              <Link href="/">
                <p className="leading-8 underline hover:no-underline cursor-pointer">Home</p>
              </Link>
              <ArrowForwardIosIcon className="px-2" />
              <Link href="/user/create">
                <p className="leading-8 underline hover:no-underline cursor-pointer">Create Post</p>
              </Link>
            </div>
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
        <div className="relative w-[28vw] shadow-md rounded-md ml-6">
          <div className="flex flex-col justify-around w-full bg-opacity-50 py-3 px-5">
            <div className="flex items-center mb-2">
              <p className="font-medium text-xl mr-8">Category:</p>
              <select className="category outline-none border border-gray-600 p-2 rounded-md cursor-pointer w-[40%]">
                {catData?.map((item: any) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center mt-4">
              <p className="font-medium text-xl mr-8">Tag:</p>
              <div className="tagselect bg-gray-200 rounded-md ml-[10%] px-6 py-2 cursor-pointer hover:bg-gray-300">
                Select
              </div>
            </div>
            <div className="absolute left-[10%] bottom-[20%] tag flex flex-col w-[80%] h-1/2  rounded-md border-gray-500 border-2 px-3 py-4">
              <p className="font-medium text-lg mb-4 mx-auto">Select Tag</p>
              <p className="flex w-full flex-wrap">
                {tagData?.map((item: any) => (
                  <div key={item.id} className="mr-6 mb-2">
                    <input
                      className="mr-1 tagcheckbox"
                      type="checkbox"
                      name={item.name}
                      id={item.id}
                    />
                    {`#${item.name}`}
                  </div>
                ))}
              </p>
            </div>
          </div>
          <button
            type="submit"
            onClick={goHomePage}
            className="absolute bottom-3 left-[10%] w-[30%] p-3 bg-gray-200 hover:bg-gray-400 rounded font-semibold tracking-wider"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleUpload}
            className="absolute bottom-3 right-[10%] w-[30%] p-3 rounded bg-blue-300 hover:bg-blue-400  text-white font-bold tracking-wider active:animate-jelly"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalPost;
