/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import AdvancedSearch from '../../../Components/admin/components/AdvancedSearch';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import PostItem from '../../../Components/admin/components/PostItem';
import LayoutAdminPage from '../../../Components/admin/layout';
import Pagination from '../../../Components/Pagination';
import useFetch from '../../../hooks/use-fetch';

function AllPost() {
  // const router = useRouter();
  const [allArticles, setAllArticles] = useState<any>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [beginDate, setBeginDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [total, setTotal] = useState<number>(10);

  const fetchArticle = async (
    page: number,
    key: string,
    begin: Date | undefined,
    end: Date | undefined,
  ) => {
    const res = await useFetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/user/article/admin/full-list?pageIndex=${page}&pageSize=10&keyword=${key}&beginDate=${
        begin || new Date('01-01-2021')
      }&endDate=${end || new Date()}`,
    );
    setAllArticles(res?.data?.list);
    setTotal(res?.data?.total);
  };

  useEffect(() => {
    fetchArticle(pageIndex, keyword, beginDate, endDate);
  }, []);

  const handleClickExport = () => {};
  const handleClickSearch = () => {
    fetchArticle(pageIndex, keyword, beginDate, endDate);
  };

  const handleCancleSearch = () => {
    setKeyword('');
    setBeginDate(undefined);
    setEndDate(undefined);
    fetchArticle(pageIndex, '', undefined, undefined);
  };

  const goOtherPage = (page: number) => {
    setPageIndex(page);
    fetchArticle(page, keyword, beginDate, endDate);
  };

  const goNextPage = () => {
    if (pageIndex < Math.round(total / 10)) {
      setPageIndex(pageIndex + 1);
      fetchArticle(pageIndex + 1, keyword, beginDate, endDate);
    }
  };

  const goPrevPage = () => {
    if (pageIndex > 1) {
      setPageIndex((pageIndex: number) => pageIndex - 1);
      fetchArticle(pageIndex - 1, keyword, beginDate, endDate);
    }
  };

  return (
    <LayoutAdminPage title="Article">
      <HeaderAdmin
        titlePage="Article Management"
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
          <h4>All articles</h4>
          <span className="text-sm mt-2 ml-2">
            (Total
            {allArticles?.length}
            )
          </span>
          <div className="flex gap-4 ml-auto mt-2 pr-3 cursor-pointer">
            <button onClick={handleClickExport}>
              <Image src="/images/share.png" width={20} height={20} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-9 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="col-span-4">Title</span>
          <span>Published at</span>
          <span>Author</span>
          <span>Status</span>
          <span>Statistics</span>
          <span className="ml-8">Option</span>
        </div>
        {allArticles.length > 0 ? (
          allArticles?.map((post: any) => <PostItem key={post.id} post={post} />)
        ) : (
          <p className="text-xl text-red-500">No data</p>
        )}
        <div className="flex justify-between">
          {total > 10 ? (
            <Pagination
              totalPage={total ? Math.round(total / 10) : 1}
              currentPage={pageIndex}
              goOtherPage={goOtherPage}
              goNextPage={goNextPage}
              goPrevPage={goPrevPage}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </LayoutAdminPage>
  );
}

export default AllPost;
