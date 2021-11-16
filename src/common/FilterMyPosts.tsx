import React from 'react';
import useSWR from 'swr';

export function FilterMyPosts() {
  const { data: tagData }: any = useSWR('http://localhost:3001/tags', { revalidateOnFocus: false });
  const { data: catData }: any = useSWR('http://localhost:3001/category', {
    revalidateOnFocus: false,
  });
  console.log(tagData);
  console.log(catData);

  return (
    <div className="fixed pt-10 mt-4 ml-3 h-full bg-gray-400 bg-opacity-80 max-w-[16vw] px-1 rounded-3xl shadow-customShadow">
      <div className="text-black text-2xl font-semibold">Filter Posts</div>
      <div className="flex flex-col ml-2">
        <div className="relative w-1/3 rounded-tr-lg rounded-br-lg">
          <div className="flex flex-col w-full bg-opacity-50 py-3">
            <div className="flex mb-4">
              <p className="font-normal text-lg mr-2">Category:</p>
              <select className="category cursor-pointer w-44">
                {catData?.map((item: any) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="flex mb-4">
              <p className="font-normal text-lg mr-2">Tag:</p>
              <select className="category cursor-pointer w-44">
                {tagData?.followingTags?.map((item: any) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <button className="mr-2 float-right rounded-3xl px-3 py-1 bg-grayLightText hover:opacity-70">
        Go
      </button>
      <button className="mr-2 float-right rounded-3xl px-3 py-1 bg-white hover:opacity-70 shadow-2xl drop-shadow-2xl">
        Cancel
      </button>
    </div>
  );
}
