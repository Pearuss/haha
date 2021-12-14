import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import LayoutAdminPage from '../../../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import PostItem from '../../../../Components/admin/components/PostItem';
import HeaderAdmin from '../../../../Components/admin/components/HeaderAdmin';
import AdvancedSearch from '../../../../Components/admin/components/AdvancedSearch';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Pagination from '../../../../Components/Pagination';
import { useRouter } from 'next/router';
import Image from 'next/image';
import DialogDelete from '../../../../Components/admin/common/dialogDelete';

function AllPost({ data }: any): ReactElement {
  const router = useRouter();

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const totalPage = Math.ceil(Number(data?.pagination._totalRow) / 5);
  const currentPage = Number(router.query.page);

  const [dataPosts, setDataPosts] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setDataPosts(data?.data?.map((post: any) => ({ ...post, selected: false })));
  }, [data]);

  const handleClickExport = () => {};

  const hasSelectedTag = useMemo(() => {
    return dataPosts?.find((post: any) => post.selected === true);
  }, [dataPosts]);

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

  const handleDeleteClick = () => {
    const dataSelected = dataPosts.filter((post: any) => post.selected === true);
    console.log(dataSelected);
    handleClose();
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
      router.push(`/adminpanel/articles/page/${currentPage - 1}`);
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
      <div className="bg-white rounded p-4 px-6">
        <div className="flex justify-between pb-4 mb-4 border-b-2 border-gray-600">
          <h4>All article</h4>
          <div className="flex gap-4 ml-auto">
            <button>
              <Image src="/images/share.png" width={20} height={20} />
            </button>
            <button>
              <Image onClick={handleClickOpen} src="/images/delete.png" width={20} height={20} />
            </button>
            <button
              className="flex items-center mr-2 px-4 py-2 border border-gray-300 cursor-pointer rounded hover:bg-gray-200"
              onClick={handleClickExport}
            >
              <UpgradeIcon />
              Export
            </button>
          </div>
        </div>
        <div className="grid grid-cols-8 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} checked={selectAll} onChange={handleSelectAllClick} />
            </span>
            <span className="flex-1">STT</span>
          </span>
          <span className="col-span-4">Title</span>
          <span>Author</span>
          <span>Approval date</span>
          <span>Status</span>
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

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3001/posts?_page=1&_limit=5');
  const { pagination } = await res.json();
  const totalPage = Math.ceil(pagination._totalRow / 5);

  let paths = [];
  for (let i = 1; i <= totalPage; i++) {
    paths.push({ params: { page: `${i}` } });
  }

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }: any) => {
  const res = await fetch(`http://localhost:3001/posts?_page=${params.page}&_limit=5`);
  const posts = await res.json();

  return {
    props: {
      data: posts,
    },
    revalidate: 1,
  };
};
