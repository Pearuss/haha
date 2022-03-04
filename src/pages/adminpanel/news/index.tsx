/* eslint-disable */
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import NewItem from '../../../Components/admin/components/NewItem';
import AdvancedSearch from '../../../Components/admin/components/AdvancedSearch';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import LayoutAdminPage from '../../../Components/admin/layout';
import Link from 'next/link';
import useFetch from '../../../hooks/use-fetch';

function News() {
  const [allNews, setAllNews] = useState<any>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [beginDate, setBeginDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const fetchArticle = async (key: string, begin: Date | undefined, end: Date | undefined) => {
    const res = await useFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/news/full-list?keyword=${key}&beginDate=${
        begin || new Date('01-01-2021')
      }&endDate=${end || new Date()}`
    );
    setAllNews(res?.data);
  };

  console.log('allArticles', allNews);

  useEffect(() => {
    fetchArticle(keyword, beginDate, endDate);
  }, []);

  const handleClickExport = () => {};
  const handleClickSearch = () => {
    fetchArticle(keyword, beginDate, endDate);
  };

  const handleCancleSearch = () => {
    setKeyword('');
    setBeginDate(undefined);
    setEndDate(undefined);
    fetchArticle('', undefined, undefined);
  };

  return (
    <LayoutAdminPage title="News">
      <HeaderAdmin
        titlePage="News Management"
        subTitlePage=""
        searchPlaceholder="Article title..."
        showSearch={false}
      />
      <AdvancedSearch
        handleClickSearch={handleClickSearch}
        keyword={keyword}
        beginDate={beginDate}
        endDate={endDate}
        setKeyword={setKeyword}
        setEndDate={setEndDate}
        setBeginDate={setBeginDate}
        handleCancleSearch={handleCancleSearch}
      />
      <div className="bg-white rounded p-4 px-6">
        <div className="flex pb-4 mb-4 border-b-2 border-gray-500 items-center">
          <h4>All news</h4>
          <span className="text-sm mt-2 ml-2">
            (Total{` `}
            {allNews.length})
          </span>
          <div className="flex gap-4 ml-auto mt-2 pr-3 cursor-pointer">
            <Link href="/adminpanel/news/create">
              <button type="button">
                <Image
                  loader={() =>
                    `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/plus.png`
                  }
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/plus.png`}
                  alt="Add"
                  width={19}
                  height={19}
                />
              </button>
            </Link>

            <button type="button">
              <Image
                loader={() =>
                  `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/share.png`
                }
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/share.png`}
                alt="Share"
                width={20}
                height={20}
              />
            </button>
            <button type="button">
              <Image
                loader={() =>
                  `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/delete.png`
                }
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/delete.png`}
                alt="Delete"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-6 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="col-span-4">Title</span>
          <span>Public at</span>
          <span>Status</span>
        </div>
        {allNews?.length > 0 ? (
          allNews?.map((_new: any) => <NewItem key={_new.id} _new={_new} />)
        ) : (
          <p className="text-xl text-red-500">No data</p>
        )}
      </div>
    </LayoutAdminPage>
  );
}

export default News;
