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
    <div className="w-full bg-gray-500 flex py-4 px-2 items-center justify-around">
      <p className="text-black text-2xl font-semibold xl:text-xl lg:text-lg">Filter Posts:</p>
      <div className="flex">
        <p className="font-normal text-lg mr-2 xl:text-base lg:text-sm md:text-sm">Category:</p>
        <select className="category cursor-pointer w-44 xl:w-28 lg:w-20 md:w-16">
          {catData?.map((item: any) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="flex">
        <p className="font-normal text-lg mr-2 xl:text-base lg:text-sm md:text-sm">Tag:</p>
        <select
          className="category cursor-pointer w-44 xl:w-28 lg:w-20 md:w-16 "
          onChange={(e) => setTagName(e.target.value)}
        >
          {tagData?.followingTags?.map((item: any) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="flex">
        <button
          className="mr-2 float-right rounded-3xl px-3 py-1 bg-grayLightText hover:opacity-70"
          onClick={handleFilter}
        >
          Go
        </button>
        <button
          className="mr-2 float-right rounded-3xl px-3 py-1 bg-white hover:opacity-70 shadow-2xl drop-shadow-2xl"
          onClick={handleNoFilter}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
