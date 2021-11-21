import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

export function FilterMyPosts({ onClickNoFilter, onClickFilter, setFilter }: any) {
  const { data: tagData }: any = useSWR('http://localhost:3001/tags', { revalidateOnFocus: false });
  const { data: catData }: any = useSWR('http://localhost:3001/category', {
    revalidateOnFocus: false,
  });

  const [tagName, setTagName] = useState(tagData?.followingTags[0]?.name || []);

  useEffect(() => {
    setTagName(tagData?.followingTags[0]?.name);
  }, [tagData]);

  const handleFilter = () => {
    onClickFilter(tagName);
    setFilter(true);
  };

  const handleNoFilter = () => {
    onClickNoFilter();
    setFilter(false);
  };

  return (
    <div className="w-full bg-gray-400 flex py-3 px-2 items-center justify-around text-gray-700 rounded-md ">
      <p className="text-2xl font-semibold xl:text-xl lg:text-lg">Filter Posts:</p>
      <div className="flex items-center">
        <p className="font-normal text-lg mr-2 xl:text-base lg:text-sm md:text-sm">Category:</p>
        <select className="category cursor-pointer w-36 xl:w-28 lg:w-20 md:w-16 rounded-md py-1 px-3">
          {catData?.map((item: any) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <p className="font-normal text-lg mr-2 xl:text-base lg:text-sm md:text-sm">Tag:</p>
        <select
          className="category cursor-pointer w-36 xl:w-28 lg:w-20 md:w-16 rounded-md py-1 px-3 "
          onChange={(e) => setTagName(e.target.value)}
        >
          {tagData?.followingTags?.map((item: any) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="flex">
        <button
          className="mr-4 float-right rounded-md px-3 py-1 shadow-sm bg-grayLightText hover:opacity-70"
          onClick={handleFilter}
        >
          Search
        </button>
        <button
          className="mr-2 float-right rounded-md px-3 py-1 bg-white hover:opacity-70  drop-shadow-2xl"
          onClick={handleNoFilter}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
