/* eslint-disable max-len */
/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';
// import { useRouter } from 'next/router';

import DialogDelete from '../../../../Components/admin/common/dialogDelete';
import AdvancedSearch from '../../../../Components/admin/components/AdvancedSearch';
import HeaderAdmin from '../../../../Components/admin/components/HeaderAdmin';
import PostItem from '../../../../Components/admin/components/PostItem';
import LayoutAdminPage from '../../../../Components/admin/layout';
// import Pagination from '../../../../Components/Pagination';
import useSWR from 'swr';

function AllPost() {
  // const router = useRouter();
  const [dataPosts, setDataPosts] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/user/article/full-list`, {
    // revalidateOnMount: false,
    revalidateOnMount: true,
    revalidateIfStale: true,
  });
  useEffect(() => {
    if (data?.data) {
      console.log(data?.data);

      setDataPosts(data?.data?.map((post: any) => ({ ...post, selected: false })));
    }
  }, [data]);

  // const totalPage = Math.ceil(Number(data?.pagination?._totalRow) / 5 || 0);
  // const currentPage = Number(router.query.page);
  console.log(dataPosts);

  const handleClickExport = () => {};

  const hasSelectedTag = useMemo(
    () => dataPosts?.find((post: any) => post.selected === true),
    [dataPosts]
  );

  useEffect(() => {
    const isSelectedAll = dataPosts?.find((post: any) => post.selected === false);
    if (typeof isSelectedAll === 'undefined') setSelectAll(true);
    else setSelectAll(false);
  }, [dataPosts]);

  const handleSelectAllClick = () => {
    const newDataTags = [...dataPosts].map((post: any) => ({ ...post, selected: !selectAll }));
    setSelectAll(!selectAll);
    setDataPosts(newDataTags);
  };

  const handleCheckItemClick = (tag: any) => {
    const index = dataPosts.indexOf(tag);
    const newDataTags = [...dataPosts];
    newDataTags.splice(index, 1, { ...tag, selected: !tag.selected });
    setDataPosts(newDataTags);
  };

  const handleClickOpen = () => {
    if (!hasSelectedTag) return;
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDeleteClick = () => {
    const dataSelected = dataPosts.filter((post: any) => post.selected === true);
    console.log(dataSelected);
    handleClose();
  };

  // const goOtherPage = (page: number) => {
  //   router.push(`/adminpanel/articles/page/${page}`);
  // };

  // const goNextPage = () => {
  //   if (currentPage < totalPage) {
  //     router.push(`/adminpanel/articles/page/${currentPage + 1}`);
  //   }
  // };

  // const goPrevPage = () => {
  //   if (currentPage > 1) {
  //     router.push(`/adminpanel/articles/page/${currentPage - 1}`);
  //   }
  // };

  return (
    <LayoutAdminPage title="Article">
      <HeaderAdmin
        titlePage="Article Management"
        subTitlePage=""
        searchPlaceholder="Article title..."
      />
      <AdvancedSearch />
      <div className="bg-white rounded p-4 px-6">
        <div className="flex pb-4 mb-4 border-b-2 border-gray-500 items-center">
          <h4>All articles</h4>
          <span className="text-sm mt-2 ml-2">(Total {dataPosts.length})</span>
          <div className="flex gap-4 ml-auto mt-2 pr-3 cursor-pointer">
            <button onClick={handleClickExport}>
              <Image src="/images/share.png" width={20} height={20} />
            </button>
            <button>
              <Image onClick={handleClickOpen} src="/images/delete.png" width={20} height={20} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-8 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} checked={selectAll} onChange={handleSelectAllClick} />
            </span>
          </span>
          <span className="col-span-3 ml-[-12%]">Title</span>
          <span>Published at</span>
          <span>Author</span>
          <span>Status</span>
          <span>Statistics</span>
        </div>
        {dataPosts?.map((post: any) => (
          <PostItem key={post.id} post={post} handleCheckItemClick={handleCheckItemClick} />
        ))}
        <DialogDelete
          label="Do you want to remove the article?"
          subContnet="Please consider this carefully, deleted articles cannot be recovered."
          openDialog={openDialog}
          handleClose={handleClose}
          handleDeleteClick={handleDeleteClick}
        />
        {/* <div className="flex justify-between">
          <div className="flex items-center text-sm mt-3 ml-2">{`Total number of articles ${data?.pagination._totalRow}`}</div>
          <Pagination
            totalPage={totalPage}
            currentPage={Number(router.query.page)}
            goOtherPage={goOtherPage}
            goNextPage={goNextPage}
            goPrevPage={goPrevPage}
          />
        </div> */}
      </div>
    </LayoutAdminPage>
  );
}

export default AllPost;

// export async function getStaticPaths() {
//   // const res = await fetch('http://localhost:3001/posts?_page=1&_limit=300');
//   // const { pagination } = await res.json();
//   // const totalPage = Math.ceil(pagination._totalRow / 5);

//   const paths = [];
//   for (let i = 1; i <= 3; i++) {
//     paths.push({ params: { page: '1' } });
//   }

//   return { paths, fallback: false };
// }

// export const getStaticProps = async () => {
//   // const res = await fetch(`http://localhost:3001/posts?_page=${params.page}&_limit=300`);
//   // const posts = await res.json();

//   return {
//     props: {
//       data: [],
//     },
//     revalidate: 1,
//   };
// };
