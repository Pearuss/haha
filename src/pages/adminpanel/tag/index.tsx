import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import LayoutAdminPage from '../../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import TagItem from '../../../Components/admin/components/TagItem';
import DialogDelete from '../../../Components/admin/common/dialogDelete';
import Image from 'next/image';
import { useRouter } from 'next/router';

function Tag(): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const tagFake = [
    {
      id: '1',
      name: 'ReactJS',
      createAt: '25/08/2000',
      description: 'Tag Description',
      status: 'Activated',
      selected: false,
    },
    {
      id: '2',
      name: 'ReactJS',
      createAt: '25/08/2000',
      description: 'Tag Description',
      status: 'Activated',
      selected: false,
    },
    {
      id: '3',
      name: 'ReactJS',
      createAt: '25/08/2000',
      description: 'Tag Description',
      status: 'Activated',
      selected: false,
    },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [dataTags, setDataTags] = useState(tagFake);

  const router = useRouter();

  const hasSelectedTag = useMemo(() => {
    return dataTags.find((tag) => tag.selected === true);
  }, [dataTags]);

  useEffect(() => {
    const isSelectedAll = dataTags.find((tag) => tag.selected === false);
    if (typeof isSelectedAll === 'undefined') setSelectAll(true);
    else setSelectAll(false);
  }, [dataTags]);

  const handleSelectAllClick = () => {
    const newDataTags = [...dataTags].map((tag) => ({ ...tag, selected: !selectAll }));
    setSelectAll(!selectAll);
    setDataTags(newDataTags);
  };

  const handleDeleteClick = () => {
    const dataSelected = dataTags.filter((tag) => tag.selected === true);
    console.log(dataSelected);
    handleClose();
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

  const handleClickAdd = () => {
    router.push('/adminpanel/tag/create');
  };

  return (
    <LayoutAdminPage title="HashTag">
      <HeaderAdmin titlePage="Hashtag" subTitlePage="Total 12" searchPlaceholder="Search tag..." />
      <div className="bg-white rounded p-4 px-6">
        <div className="flex pb-4 mb-4 border-b-2 border-gray-500 items-center">
          <h4>All hashtag</h4>
          <span className="text-sm mt-2 ml-2">(3)</span>
          <div className="flex gap-4 ml-auto mt-2 pr-3 cursor-pointer">
            <button onClick={handleClickAdd}>
              <Image src="/images/plus.png" width={19} height={19} />
            </button>
            <button
              onClick={handleClickOpen}
              disabled={typeof hasSelectedTag === 'undefined' ? true : false}
            >
              <Image src="/images/delete.png" width={20} height={20} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} checked={selectAll} onChange={handleSelectAllClick} />
            </span>
          </span>
          <span>Tag Name</span>
          <span>Date created</span>
          <span>Total tag</span>
          <span>Status</span>
        </div>
        {dataTags.map((tag) => (
          <TagItem key={tag.id} tag={tag} handleCheckItemClick={handleCheckItemClick} />
        ))}
        <DialogDelete
          label="Do you want to remove the tag?"
          subContnet="Please consider this carefully, deleted tags cannot be recovered."
          openDialog={openDialog}
          handleClose={handleClose}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </LayoutAdminPage>
  );
}

export default Tag;
