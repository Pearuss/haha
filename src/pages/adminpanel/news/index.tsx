/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';

import NewItem from '../../../Components/admin/components/NewItem';
import DialogDelete from '../../../Components/admin/common/dialogDelete';
import AdvancedSearch from '../../../Components/admin/components/AdvancedSearch';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import LayoutAdminPage from '../../../Components/admin/layout';
import useSWR from 'swr';
import Link from 'next/link';

function News() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [dataPosts, setDataPosts] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { data } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/news/full-list`, {
    // revalidateOnMount: false,
    revalidateOnMount: true,
    revalidateIfStale: true,
  });

  useEffect(() => {
    if (data?.data) {
      console.log(data?.data);

      setDataPosts(data.data.map((post: any) => ({ ...post, selected: false })));
    }
  }, [data]);

  // const handleClickExport = () => {};

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
  return (
    <LayoutAdminPage title="News">
      <HeaderAdmin
        titlePage="News Management"
        subTitlePage=""
        searchPlaceholder="Article title..."
      />
      <AdvancedSearch />
      <div className="bg-white rounded p-4 px-6">
        <div className="flex pb-4 mb-4 border-b-2 border-gray-500 items-center">
          <h4>All news</h4>
          <span className="text-sm mt-2 ml-2">({dataPosts.length})</span>
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
            <button type="button" onClick={handleClickOpen}>
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
        <div className="grid grid-cols-7 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} checked={selectAll} onChange={handleSelectAllClick} />
            </span>
          </span>
          <span className="col-span-3 ml-[-12%]">Title</span>
          <span>Public at</span>
          {/* <span>Author</span> */}
          <span>Status</span>
          <span>Statistics</span>
        </div>
        {dataPosts?.map((_new: any) => {
          return <NewItem key={_new.id} _new={_new} handleCheckItemClick={handleCheckItemClick} />;
        })}
        <DialogDelete
          label="Do you want to remove the article?"
          subContnet="Please consider this carefully, deleted articles cannot be recovered."
          openDialog={openDialog}
          handleClose={handleClose}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </LayoutAdminPage>
  );
}

export default News;

// export const getStaticProps = async () => {
//   // const res = await fetch('http://localhost:3001/posts?_limit=4');
//   // const news = await res.json();

//   // return {
//   //   props: {
//   //     data: [],
//   //   },
//   //   revalidate: 1,
//   // };
// };
