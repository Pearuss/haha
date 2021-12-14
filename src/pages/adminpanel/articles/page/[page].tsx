import React, { ReactElement, useEffect, useState } from 'react';
import LayoutAdminPage from '../../../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import PostItem from '../../../../Components/admin/components/PostItem';
import HeaderAdmin from '../../../../Components/admin/components/HeaderAdmin';
import AdvancedSearch from '../../../../Components/admin/components/AdvancedSearch';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Pagination from '../../../../Components/Pagination';
import { useRouter } from 'next/router';
import useSWR from 'swr';

interface PostItem {
  id: string;
  title: string;
  img: string;
  body: string;
}

function AllPost(): ReactElement {
  const router = useRouter();

  const { data }: any = useSWR(`http://localhost:3001/posts?_page=${router.query.page}&_limit=5`, {
    revalidateOnFocus: false,
  });

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const totalPage = Math.ceil(Number(data?.pagination._totalRow) / 5);
  const currentPage = Number(router.query.page);

  const [dataPosts, setDataPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    setDataPosts(data?.data);
  }, [data]);

  const handleClickExport = () => {};

  const goOtherPage = (page: number) => {
    router.push(`/adminpanel/articles/page/${page}`);
  };

  const goNextPage = () => {
    if (currentPage < totalPage) {
      router.push(`/adminpanel/articles/page/${currentPage + 1}`);
    }
  };

  const goPrevPage = () => {
    if (currentPage > 1) {
      router.push(`/user/posts/${currentPage - 1}`);
    }
  };

  return (
    <LayoutAdminPage title="Article">
      <HeaderAdmin
        titlePage="Article"
        subTitlePage={`Total number of articles ${data?.pagination._totalRow}`}
        searchPlaceholder="Article title..."
      />
      <AdvancedSearch />
      <div className="bg-white rounded p-4 px-6 min-w-[1167px]">
        <div className="flex justify-between pb-4 mb-4 border-b-2 border-gray-600">
          <h4 className="">Hashtag list</h4>
          <button
            className="flex items-center mr-2 px-4 py-2 border border-gray-300 cursor-pointer rounded hover:bg-gray-200"
            onClick={handleClickExport}
          >
            <UpgradeIcon />
            Export
          </button>
        </div>
        <div className="grid grid-cols-8 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} />
            </span>
            <span className="flex-1">STT</span>
          </span>
          <span className="col-span-4">Title</span>
          <span>Author</span>
          <span>Approval date</span>
          <span>Status</span>
        </div>
        {dataPosts?.map((post: any) => (
          <PostItem key={post.id} data={post} />
        ))}
        {/* <Pagination totalPage={5} currentPage={1} /> */}
        <Pagination
          totalPage={totalPage}
          currentPage={Number(router.query.page)}
          goOtherPage={goOtherPage}
          goNextPage={goNextPage}
          goPrevPage={goPrevPage}
        />
      </div>
    </LayoutAdminPage>
  );
}

export default AllPost;

// export const getStaticProps = async () => {
//   const res = await fetch(`http://localhost:3001/posts?_page=${1}&_limit=5`);
//   const posts = await res.json();

//   return {
//     props: {
//       data: posts?.map((post: any) => ({
//         id: post.id,
//         title: post.title,
//         body: post.body,
//         tags: post.tags,
//         author: post.author,
//         img: post.img,
//       })),
//     },
//     revalidate: 1,
//   };
// };
