import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import LayoutAdminPage from '../../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import AdvancedSearch from '../../../Components/admin/components/AdvancedSearch';
import TagItem from '../../../Components/admin/components/TagItem';
import DialogDelete from '../../../Components/admin/common/dialogDelete';

function Tag(): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const tagFake = [
    {
      id: '1',
      name: 'ReactJS',
      createAt: '25/08/200 08:25',
      description: 'Tag Description',
      status: 'Activated',
      selected: false,
    },
    {
      id: '2',
      name: 'ReactJS',
      createAt: '25/08/200 08:25',
      description: 'Tag Description',
      status: 'Activated',
      selected: false,
    },
    {
      id: '3',
      name: 'ReactJS',
      createAt: '25/08/200 08:25',
      description: 'Tag Description',
      status: 'Activated',
      selected: false,
    },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [dataTags, setDataTags] = useState(tagFake);

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

  return (
    <LayoutAdminPage title="HashTag">
      <HeaderAdmin titlePage="Hashtag" subTitlePage="Total 12" searchPlaceholder="Search tag..." />
      <AdvancedSearch />
      <div className="bg-white rounded p-4 px-6 min-w-[1167px]">
        <div className="flex justify-between pb-4 mb-4 border-b-2 border-gray-600">
          <h4 className="">Hashtag list</h4>
          <button
            disabled={typeof hasSelectedTag === 'undefined' ? true : false}
            className="px-4 py-2 border border-gray-300 cursor-pointer rounded hover:bg-gray-200"
            onClick={handleClickOpen}
          >
            Delete
          </button>
        </div>
        <div className="grid grid-cols-6 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} checked={selectAll} onChange={handleSelectAllClick} />
            </span>
            <span className="flex-1">STT</span>
          </span>
          <span>Tag Name</span>
          <span>Date created</span>
          <span className="col-span-2">Description</span>
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
