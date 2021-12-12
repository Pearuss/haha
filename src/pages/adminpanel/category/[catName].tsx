import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import LayoutAdminPage from '../../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import CategoryItem from '../../../Components/admin/components/CategoryItem';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import DialogDelete from '../../../Components/admin/common/dialogDelete';

function Category(): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const catFake = [
    {
      id: '1',
      name: 'ReactJS',
      createAt: '25/08/200 08:25',
      description: 'Cat Description',
      status: 'Activated',
      selected: false,
    },
    {
      id: '2',
      name: 'ReactJS',
      createAt: '25/08/200 08:25',
      description: 'Cat Description',
      status: 'Activated',
      selected: false,
    },
    {
      id: '3',
      name: 'ReactJS',
      createAt: '25/08/200 08:25',
      description: 'Cat Description',
      status: 'Activated',
      selected: false,
    },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [dataCats, setDataCats] = useState(catFake);

  const hasSelectedCat = useMemo(() => {
    return dataCats.find((cat) => cat.selected === true);
  }, [dataCats]);

  useEffect(() => {
    const isSelectedAll = dataCats.find((cat) => cat.selected === false);
    if (typeof isSelectedAll === 'undefined') setSelectAll(true);
    else setSelectAll(false);
  }, [dataCats]);

  const handleSelectAllClick = () => {
    const newDataCats = [...dataCats].map((cat) => ({ ...cat, selected: !selectAll }));
    setSelectAll(!selectAll);
    setDataCats(newDataCats);
  };

  const handleDeleteClick = () => {
    const dataSelected = dataCats.filter((cat) => cat.selected === true);
    console.log(dataSelected);
    handleClose();
  };

  const handleCheckItemClick = (cat: any) => {
    const index = dataCats.indexOf(cat);
    const newDataCats = [...dataCats];
    newDataCats.splice(index, 1, { ...cat, selected: !cat.selected });
    setDataCats(newDataCats);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <LayoutAdminPage title="Category">
      <HeaderAdmin
        titlePage="Category"
        subTitlePage="Total 12"
        searchPlaceholder="Search category..."
      />

      <div className="bg-white rounded p-4 px-6 min-w-[1167px]">
        <div className="flex justify-between pb-4 mb-4 border-b-2 border-gray-600">
          <h4 className="">Category list</h4>
          <button
            disabled={typeof hasSelectedCat === 'undefined' ? true : false}
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
          <span>Category Name</span>
          <span>Ngày tạo</span>
          <span className="col-span-2">Mô tả</span>
          <span>Trạng thái</span>
        </div>
        {dataCats.map((cat) => (
          <CategoryItem key={cat.id} cat={cat} handleCheckItemClick={handleCheckItemClick} />
        ))}
        <DialogDelete
          label="Do you want to remove the category?"
          subContnet="Please consider this carefully, deleted categorys cannot be recovered."
          openDialog={openDialog}
          handleClose={handleClose}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </LayoutAdminPage>
  );
}

export default Category;
