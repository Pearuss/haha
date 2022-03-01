/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React, { useEffect, useMemo, useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import DialogDelete from '../../../Components/admin/common/dialogDelete';
import Popup from '../../../Components/admin/common/popUp';
import FormUpdateTag from '../../../Components/admin/components/FormUpdateTag';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import TagItem from '../../../Components/admin/components/TagItem';
import LayoutAdminPage from '../../../Components/admin/layout';

function Tag() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/tags/full-list`, {
    // revalidateOnMount: false,
    revalidateOnMount: true,
    revalidateIfStale: true,
  });

  console.log(data);

  const [openDialog, setOpenDialog] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [dataTags, setDataTags] = useState<any>([]);
  const [tagSelected, setTagSelected] = useState();

  const router = useRouter();

  useEffect(() => {
    if (data?.data) {
      console.log(data?.data);

      setDataTags(data.data.map((post: any) => ({ ...post, selected: false })));
    }
  }, [data]);

  const hasSelectedTag = useMemo(
    () => dataTags.find((tag: any) => tag.selected === true),
    [dataTags],
  );

  useEffect(() => {
    const isSelectedAll = dataTags.find((tag: any) => tag.selected === false);
    if (typeof isSelectedAll === 'undefined') setSelectAll(true);
    else setSelectAll(false);
  }, [dataTags]);

  const handleSelectAllClick = () => {
    const newDataTags = [...dataTags].map((tag) => ({ ...tag, selected: !selectAll }));
    setSelectAll(!selectAll);
    setDataTags(newDataTags);
  };

  const handleCheckItemClick = (tag: any) => {
    const index = dataTags.indexOf(tag);
    const newDataTags = [...dataTags];
    newDataTags.splice(index, 1, { ...tag, selected: !tag.selected });
    setDataTags(newDataTags);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDeleteClick = () => {
    const dataSelected = dataTags.filter((tag: any) => tag.selected === true);
    console.log(dataSelected);
    handleClose();
  };

  const handleClickAdd = () => {
    router.push('/adminpanel/tag/create');
  };

  const handleUpdateClick = () => {
    console.log('updated');
  };

  return (
    <LayoutAdminPage title="HashTag">
      <HeaderAdmin titlePage="Hashtag" subTitlePage="" searchPlaceholder="Search tag..." showSearch={true} />
      <div className="bg-white rounded p-4 px-6">
        <div className="flex pb-4 mb-4 border-b-2 border-gray-500 items-center">
          <h4>All hashtag</h4>
          <span className="text-sm mt-2 ml-2">
            (Total
            {dataTags.length}
            )
          </span>
          <div className="flex gap-4 ml-auto mt-2 pr-3 cursor-pointer">
            <button onClick={handleClickAdd}>
              <Image
                loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/plus.png`}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/plus.png`}
                alt="Add"
                width={19}
                height={19}
              />
            </button>
            <button onClick={handleClickOpen} disabled={typeof hasSelectedTag === 'undefined'}>
              <Image
                loader={() => `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/delete.png`}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/delete.png`}
                alt="Delete"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} checked={selectAll} onChange={handleSelectAllClick} />
            </span>
          </span>
          <span className="ml-[-50%]">Tag Name</span>
          <span>Date created</span>
          <span>Total Articles</span>
          <span>Status</span>
        </div>
        {dataTags.map((tag: any) => (
          <TagItem
            setOpenPopup={setOpenPopup}
            setTagSelected={setTagSelected}
            key={tag.id}
            tag={tag}
            handleCheckItemClick={handleCheckItemClick}
          />
        ))}
        <DialogDelete
          label="Do you want to remove the tag?"
          subContnet="Please consider this carefully, deleted tags cannot be recovered."
          openDialog={openDialog}
          handleClose={handleClose}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
      <Popup title="Update Tag" openPopup={openPopup}>
        <FormUpdateTag
          tag={tagSelected}
          setOpenPopup={setOpenPopup}
          handleUpdateClick={handleUpdateClick}
        />
      </Popup>
    </LayoutAdminPage>
  );
}

export default Tag;
